
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'OpenBreweryDb',
        slug: "open-brewery-db",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://api.openbrewerydb.org/v1",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      brewery: {
      },

    }
  }


  entity = {
    "brewery": {
      "fields": [
        {
          "name": "address_1",
          "short": "Street address line 1",
          "type": "`$STRING`"
        },
        {
          "name": "address_2",
          "short": "Street address line 2",
          "type": "`$STRING`"
        },
        {
          "name": "address_3",
          "short": "Street address line 3",
          "type": "`$STRING`"
        },
        {
          "name": "brewery_type",
          "req": true,
          "short": "Type of brewery",
          "type": "`$STRING`"
        },
        {
          "name": "city",
          "req": true,
          "short": "City where the brewery is located",
          "type": "`$STRING`"
        },
        {
          "name": "country",
          "req": true,
          "short": "Country",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "req": true,
          "short": "Unique identifier for the brewery",
          "type": "`$STRING`"
        },
        {
          "name": "latitude",
          "short": "Latitude coordinate",
          "type": "`$STRING`"
        },
        {
          "name": "longitude",
          "short": "Longitude coordinate",
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "req": true,
          "short": "Name of the brewery",
          "type": "`$STRING`"
        },
        {
          "name": "phone",
          "short": "Phone number",
          "type": "`$STRING`"
        },
        {
          "name": "postal_code",
          "short": "Postal/ZIP code",
          "type": "`$STRING`"
        },
        {
          "name": "state",
          "short": "State abbreviation",
          "type": "`$STRING`"
        },
        {
          "name": "state_province",
          "short": "State or province",
          "type": "`$STRING`"
        },
        {
          "name": "street",
          "short": "Full street address",
          "type": "`$STRING`"
        },
        {
          "name": "website_url",
          "short": "Website URL",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
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
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "by_country",
                    "orig": "by_country",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "by_name",
                    "orig": "by_name",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "by_postal",
                    "orig": "by_postal",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "by_state",
                    "orig": "by_state",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "by_type",
                    "orig": "by_type",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": 50,
                    "kind": "query",
                    "name": "per_page",
                    "orig": "per_page",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/breweries",
              "segments": [
                {
                  "lit": "breweries"
                }
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
                  "per_page"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "breweries"
              ]
            }
          ]
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/breweries/{id}",
              "segments": [
                {
                  "lit": "breweries"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "breweries",
                "{id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

