-- OpenBreweryDb SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "OpenBreweryDb",
      slug = "open-brewery-db",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["transport"] = "base",
      },
    },
    options = {
      base = "https://api.openbrewerydb.org/v1",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["brewery"] = {},
      },
    },
    entity = {
      ["brewery"] = {
        ["fields"] = {
          {
            ["name"] = "address_1",
            ["short"] = "Street address line 1",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "address_2",
            ["short"] = "Street address line 2",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "address_3",
            ["short"] = "Street address line 3",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "brewery_type",
            ["req"] = true,
            ["short"] = "Type of brewery",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "city",
            ["req"] = true,
            ["short"] = "City where the brewery is located",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "country",
            ["req"] = true,
            ["short"] = "Country",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["req"] = true,
            ["short"] = "Unique identifier for the brewery",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "latitude",
            ["short"] = "Latitude coordinate",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "longitude",
            ["short"] = "Longitude coordinate",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "name",
            ["req"] = true,
            ["short"] = "Name of the brewery",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "phone",
            ["short"] = "Phone number",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "postal_code",
            ["short"] = "Postal/ZIP code",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "state",
            ["short"] = "State abbreviation",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "state_province",
            ["short"] = "State or province",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "street",
            ["short"] = "Full street address",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "website_url",
            ["short"] = "Website URL",
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "brewery",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "by_city",
                      ["orig"] = "by_city",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "by_country",
                      ["orig"] = "by_country",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "by_name",
                      ["orig"] = "by_name",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "by_postal",
                      ["orig"] = "by_postal",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "by_state",
                      ["orig"] = "by_state",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "by_type",
                      ["orig"] = "by_type",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = 1,
                      ["kind"] = "query",
                      ["name"] = "page",
                      ["orig"] = "page",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = 50,
                      ["kind"] = "query",
                      ["name"] = "per_page",
                      ["orig"] = "per_page",
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/breweries",
                ["segments"] = {
                  {
                    ["lit"] = "breweries",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "by_city",
                    "by_country",
                    "by_name",
                    "by_postal",
                    "by_state",
                    "by_type",
                    "page",
                    "per_page",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "breweries",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/breweries/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "breweries",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "breweries",
                  "{id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
