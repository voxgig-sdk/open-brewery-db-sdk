// Typed models for the OpenBreweryDb SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/open-brewery-db-sdk/go/core"
)

// Brewery is the typed data model for the brewery entity.
type Brewery struct {
	Address1 *string `json:"address_1,omitempty"`
	Address2 *string `json:"address_2,omitempty"`
	Address3 *string `json:"address_3,omitempty"`
	BreweryType string `json:"brewery_type"`
	City string `json:"city"`
	Country string `json:"country"`
	Id string `json:"id"`
	Latitude *string `json:"latitude,omitempty"`
	Longitude *string `json:"longitude,omitempty"`
	Name string `json:"name"`
	Phone *string `json:"phone,omitempty"`
	PostalCode *string `json:"postal_code,omitempty"`
	State *string `json:"state,omitempty"`
	StateProvince *string `json:"state_province,omitempty"`
	Street *string `json:"street,omitempty"`
	WebsiteUrl *string `json:"website_url,omitempty"`
}

// BreweryLoadMatch is the typed request payload for Brewery.LoadTyped.
type BreweryLoadMatch struct {
	Id string `json:"id"`
}

// BreweryListMatch is the typed request payload for Brewery.ListTyped.
type BreweryListMatch struct {
	ByCity *string `json:"by_city,omitempty"`
	ByCountry *string `json:"by_country,omitempty"`
	ByName *string `json:"by_name,omitempty"`
	ByPostal *string `json:"by_postal,omitempty"`
	ByState *string `json:"by_state,omitempty"`
	ByType *string `json:"by_type,omitempty"`
	Page *int `json:"page,omitempty"`
	PerPage *int `json:"per_page,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
