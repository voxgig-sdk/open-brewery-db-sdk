package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/open-brewery-db-sdk"
	"github.com/voxgig-sdk/open-brewery-db-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestBreweryEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Brewery(nil)
		if ent == nil {
			t.Fatal("expected non-nil BreweryEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := breweryBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "brewery." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set OPENBREWERYDB_TEST_BREWERY_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		breweryRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.brewery", setup.data)))
		var breweryRef01Data map[string]any
		if len(breweryRef01DataRaw) > 0 {
			breweryRef01Data = core.ToMapAny(breweryRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = breweryRef01Data

		// LIST
		breweryRef01Ent := client.Brewery(nil)
		breweryRef01Match := map[string]any{}

		breweryRef01ListResult, err := breweryRef01Ent.List(breweryRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, breweryRef01ListOk := breweryRef01ListResult.([]any)
		if !breweryRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", breweryRef01ListResult)
		}

		// LOAD
		breweryRef01MatchDt0 := map[string]any{
			"id": breweryRef01Data["id"],
		}
		breweryRef01DataDt0Loaded, err := breweryRef01Ent.Load(breweryRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		breweryRef01DataDt0LoadResult := core.ToMapAny(breweryRef01DataDt0Loaded)
		if breweryRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if breweryRef01DataDt0LoadResult["id"] != breweryRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func breweryBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "brewery", "BreweryTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read brewery test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse brewery test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"brewery01", "brewery02", "brewery03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("OPENBREWERYDB_TEST_BREWERY_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"OPENBREWERYDB_TEST_BREWERY_ENTID": idmap,
		"OPENBREWERYDB_TEST_LIVE":      "FALSE",
		"OPENBREWERYDB_TEST_EXPLAIN":   "FALSE",
		"OPENBREWERYDB_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["OPENBREWERYDB_TEST_BREWERY_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["OPENBREWERYDB_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["OPENBREWERYDB_APIKEY"],
			},
			extra,
		})
		client = sdk.NewOpenBreweryDbSDK(core.ToMapAny(mergedOpts))
	}

	live := env["OPENBREWERYDB_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["OPENBREWERYDB_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
