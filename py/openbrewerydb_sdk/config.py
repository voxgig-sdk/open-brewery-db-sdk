# OpenBreweryDb SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "OpenBreweryDb",
            "slug": "open-brewery-db",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
      },
        },
        "options": {
            "base": "https://api.openbrewerydb.org/v1",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "brewery": {},
            },
        },
        "entity": {
      "brewery": {
        "fields": [
          {
            "name": "address_1",
            "short": "Street address line 1",
            "type": "`$STRING`",
          },
          {
            "name": "address_2",
            "short": "Street address line 2",
            "type": "`$STRING`",
          },
          {
            "name": "address_3",
            "short": "Street address line 3",
            "type": "`$STRING`",
          },
          {
            "name": "brewery_type",
            "req": True,
            "short": "Type of brewery",
            "type": "`$STRING`",
          },
          {
            "name": "city",
            "req": True,
            "short": "City where the brewery is located",
            "type": "`$STRING`",
          },
          {
            "name": "country",
            "req": True,
            "short": "Country",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "req": True,
            "short": "Unique identifier for the brewery",
            "type": "`$STRING`",
          },
          {
            "name": "latitude",
            "short": "Latitude coordinate",
            "type": "`$STRING`",
          },
          {
            "name": "longitude",
            "short": "Longitude coordinate",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "req": True,
            "short": "Name of the brewery",
            "type": "`$STRING`",
          },
          {
            "name": "phone",
            "short": "Phone number",
            "type": "`$STRING`",
          },
          {
            "name": "postal_code",
            "short": "Postal/ZIP code",
            "type": "`$STRING`",
          },
          {
            "name": "state",
            "short": "State abbreviation",
            "type": "`$STRING`",
          },
          {
            "name": "state_province",
            "short": "State or province",
            "type": "`$STRING`",
          },
          {
            "name": "street",
            "short": "Full street address",
            "type": "`$STRING`",
          },
          {
            "name": "website_url",
            "short": "Website URL",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "brewery",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "by_city",
                      "orig": "by_city",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "by_country",
                      "orig": "by_country",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "by_name",
                      "orig": "by_name",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "by_postal",
                      "orig": "by_postal",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "by_state",
                      "orig": "by_state",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "by_type",
                      "orig": "by_type",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 50,
                      "kind": "query",
                      "name": "per_page",
                      "orig": "per_page",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/breweries",
                "segments": [
                  {
                    "lit": "breweries",
                  },
                ],
                "select": {
                  "exist": [
                    "by_city",
                    "by_country",
                    "by_name",
                    "by_postal",
                    "by_state",
                    "by_type",
                    "page",
                    "per_page",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "breweries",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/breweries/{id}",
                "segments": [
                  {
                    "lit": "breweries",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "breweries",
                  "{id}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
