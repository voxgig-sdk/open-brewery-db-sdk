
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

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
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
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
              "parts": [
                "breweries"
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
              }
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
              "parts": [
                "breweries",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
  config
}

