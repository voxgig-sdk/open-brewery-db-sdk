package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "OpenBreweryDb",
			"slug": "open-brewery-db",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://api.openbrewerydb.org/v1",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"brewery": map[string]any{},
			},
		},
		"entity": map[string]any{
			"brewery": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "address_1",
						"short": "Street address line 1",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "address_2",
						"short": "Street address line 2",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "address_3",
						"short": "Street address line 3",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "brewery_type",
						"req": true,
						"short": "Type of brewery",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "city",
						"req": true,
						"short": "City where the brewery is located",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "country",
						"req": true,
						"short": "Country",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"req": true,
						"short": "Unique identifier for the brewery",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "latitude",
						"short": "Latitude coordinate",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "longitude",
						"short": "Longitude coordinate",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"req": true,
						"short": "Name of the brewery",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "phone",
						"short": "Phone number",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "postal_code",
						"short": "Postal/ZIP code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "state",
						"short": "State abbreviation",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "state_province",
						"short": "State or province",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "street",
						"short": "Full street address",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "website_url",
						"short": "Website URL",
						"type": "`$STRING`",
					},
				},
				"name": "brewery",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "by_city",
											"orig": "by_city",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "by_country",
											"orig": "by_country",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "by_name",
											"orig": "by_name",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "by_postal",
											"orig": "by_postal",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "by_state",
											"orig": "by_state",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "by_type",
											"orig": "by_type",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 50,
											"kind": "query",
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/breweries",
								"parts": []any{
									"breweries",
								},
								"select": map[string]any{
									"exist": []any{
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/breweries/{id}",
								"parts": []any{
									"breweries",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
