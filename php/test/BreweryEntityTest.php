<?php
declare(strict_types=1);

// Brewery entity test

require_once __DIR__ . '/../openbrewerydb_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class BreweryEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = OpenBreweryDbSDK::test(null, null);
        $ent = $testsdk->Brewery(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = brewery_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "brewery." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set OPENBREWERYDB_TEST_BREWERY_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $brewery_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.brewery")));
        $brewery_ref01_data = null;
        if (count($brewery_ref01_data_raw) > 0) {
            $brewery_ref01_data = Helpers::to_map($brewery_ref01_data_raw[0][1]);
        }

        // LIST
        $brewery_ref01_ent = $client->Brewery(null);
        $brewery_ref01_match = [];

        [$brewery_ref01_list_result, $err] = $brewery_ref01_ent->list($brewery_ref01_match, null);
        $this->assertNull($err);
        $this->assertIsArray($brewery_ref01_list_result);

        // LOAD
        $brewery_ref01_match_dt0 = [
            "id" => $brewery_ref01_data["id"],
        ];
        [$brewery_ref01_data_dt0_loaded, $err] = $brewery_ref01_ent->load($brewery_ref01_match_dt0, null);
        $this->assertNull($err);
        $brewery_ref01_data_dt0_load_result = Helpers::to_map($brewery_ref01_data_dt0_loaded);
        $this->assertNotNull($brewery_ref01_data_dt0_load_result);
        $this->assertEquals($brewery_ref01_data_dt0_load_result["id"], $brewery_ref01_data["id"]);

    }
}

function brewery_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/brewery/BreweryTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = OpenBreweryDbSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["brewery01", "brewery02", "brewery03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("OPENBREWERYDB_TEST_BREWERY_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "OPENBREWERYDB_TEST_BREWERY_ENTID" => $idmap,
        "OPENBREWERYDB_TEST_LIVE" => "FALSE",
        "OPENBREWERYDB_TEST_EXPLAIN" => "FALSE",
        "OPENBREWERYDB_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["OPENBREWERYDB_TEST_BREWERY_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["OPENBREWERYDB_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["OPENBREWERYDB_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new OpenBreweryDbSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["OPENBREWERYDB_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["OPENBREWERYDB_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
