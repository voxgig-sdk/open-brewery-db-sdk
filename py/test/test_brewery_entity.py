# Brewery entity test

import json
import os
import time

import pytest

from utility.voxgig_struct import voxgig_struct as vs
from openbrewerydb_sdk import OpenBreweryDbSDK
from core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestBreweryEntity:

    def test_should_create_instance(self):
        testsdk = OpenBreweryDbSDK.test(None, None)
        ent = testsdk.Brewery(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _brewery_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["list", "load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "brewery." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set OPENBREWERYDB_TEST_BREWERY_ENTID JSON to run live")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        brewery_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.brewery")))
        brewery_ref01_data = None
        if len(brewery_ref01_data_raw) > 0:
            brewery_ref01_data = helpers.to_map(brewery_ref01_data_raw[0][1])

        # LIST
        brewery_ref01_ent = client.Brewery(None)
        brewery_ref01_match = {}

        brewery_ref01_list_result, err = brewery_ref01_ent.list(brewery_ref01_match, None)
        assert err is None
        assert isinstance(brewery_ref01_list_result, list)

        # LOAD
        brewery_ref01_match_dt0 = {
            "id": brewery_ref01_data["id"],
        }
        brewery_ref01_data_dt0_loaded, err = brewery_ref01_ent.load(brewery_ref01_match_dt0, None)
        assert err is None
        brewery_ref01_data_dt0_load_result = helpers.to_map(brewery_ref01_data_dt0_loaded)
        assert brewery_ref01_data_dt0_load_result is not None
        assert brewery_ref01_data_dt0_load_result["id"] == brewery_ref01_data["id"]



def _brewery_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/brewery/BreweryTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = OpenBreweryDbSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["brewery01", "brewery02", "brewery03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "OPENBREWERYDB_TEST_BREWERY_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "OPENBREWERYDB_TEST_BREWERY_ENTID": idmap,
        "OPENBREWERYDB_TEST_LIVE": "FALSE",
        "OPENBREWERYDB_TEST_EXPLAIN": "FALSE",
        "OPENBREWERYDB_APIKEY": "NONE",
    })

    idmap_resolved = helpers.to_map(
        env.get("OPENBREWERYDB_TEST_BREWERY_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("OPENBREWERYDB_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            {
                "apikey": env.get("OPENBREWERYDB_APIKEY"),
            },
            extra or {},
        ])
        client = OpenBreweryDbSDK(helpers.to_map(merged_opts))

    _live = env.get("OPENBREWERYDB_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("OPENBREWERYDB_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
