# Brewery entity test

require "minitest/autorun"
require "json"
require_relative "../OpenBreweryDb_sdk"
require_relative "runner"

class BreweryEntityTest < Minitest::Test
  def test_create_instance
    testsdk = OpenBreweryDbSDK.test(nil, nil)
    ent = testsdk.Brewery(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = brewery_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "brewery." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set OPENBREWERYDB_TEST_BREWERY_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    brewery_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.brewery")))
    brewery_ref01_data = nil
    if brewery_ref01_data_raw.length > 0
      brewery_ref01_data = Helpers.to_map(brewery_ref01_data_raw[0][1])
    end

    # LIST
    brewery_ref01_ent = client.Brewery(nil)
    brewery_ref01_match = {}

    brewery_ref01_list_result = brewery_ref01_ent.list(brewery_ref01_match, nil)
    assert brewery_ref01_list_result.is_a?(Array)

    # LOAD
    brewery_ref01_match_dt0 = {
      "id" => brewery_ref01_data["id"],
    }
    brewery_ref01_data_dt0_loaded = brewery_ref01_ent.load(brewery_ref01_match_dt0, nil)
    brewery_ref01_data_dt0_load_result = Helpers.to_map(brewery_ref01_data_dt0_loaded)
    assert !brewery_ref01_data_dt0_load_result.nil?
    assert_equal brewery_ref01_data_dt0_load_result["id"], brewery_ref01_data["id"]

  end
end

def brewery_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "brewery", "BreweryTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = OpenBreweryDbSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["brewery01", "brewery02", "brewery03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["OPENBREWERYDB_TEST_BREWERY_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "OPENBREWERYDB_TEST_BREWERY_ENTID" => idmap,
    "OPENBREWERYDB_TEST_LIVE" => "FALSE",
    "OPENBREWERYDB_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["OPENBREWERYDB_TEST_BREWERY_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["OPENBREWERYDB_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = OpenBreweryDbSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["OPENBREWERYDB_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["OPENBREWERYDB_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
