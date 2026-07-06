// Typed models for the OpenBreweryDb SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Brewery {
  address_1?: string
  address_2?: string
  address_3?: string
  brewery_type: string
  city: string
  country: string
  id: string
  latitude?: string
  longitude?: string
  name: string
  phone?: string
  postal_code?: string
  state?: string
  state_province?: string
  street?: string
  website_url?: string
}

export interface BreweryLoadMatch {
  id: string
}

export interface BreweryListMatch {
  address_1?: string
  address_2?: string
  address_3?: string
  brewery_type?: string
  city?: string
  country?: string
  id?: string
  latitude?: string
  longitude?: string
  name?: string
  phone?: string
  postal_code?: string
  state?: string
  state_province?: string
  street?: string
  website_url?: string
}

