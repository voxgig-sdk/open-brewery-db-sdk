# frozen_string_literal: true

# Typed models for the OpenBreweryDb SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Brewery entity data model.
#
# @!attribute [rw] address_1
#   @return [String, nil]
#
# @!attribute [rw] address_2
#   @return [String, nil]
#
# @!attribute [rw] address_3
#   @return [String, nil]
#
# @!attribute [rw] brewery_type
#   @return [String]
#
# @!attribute [rw] city
#   @return [String]
#
# @!attribute [rw] country
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] latitude
#   @return [String, nil]
#
# @!attribute [rw] longitude
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] phone
#   @return [String, nil]
#
# @!attribute [rw] postal_code
#   @return [String, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
#
# @!attribute [rw] state_province
#   @return [String, nil]
#
# @!attribute [rw] street
#   @return [String, nil]
#
# @!attribute [rw] website_url
#   @return [String, nil]
Brewery = Struct.new(
  :address_1,
  :address_2,
  :address_3,
  :brewery_type,
  :city,
  :country,
  :id,
  :latitude,
  :longitude,
  :name,
  :phone,
  :postal_code,
  :state,
  :state_province,
  :street,
  :website_url,
  keyword_init: true
)

# Request payload for Brewery#load.
#
# @!attribute [rw] id
#   @return [String]
BreweryLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Brewery#list.
#
# @!attribute [rw] address_1
#   @return [String, nil]
#
# @!attribute [rw] address_2
#   @return [String, nil]
#
# @!attribute [rw] address_3
#   @return [String, nil]
#
# @!attribute [rw] brewery_type
#   @return [String, nil]
#
# @!attribute [rw] city
#   @return [String, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] latitude
#   @return [String, nil]
#
# @!attribute [rw] longitude
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] phone
#   @return [String, nil]
#
# @!attribute [rw] postal_code
#   @return [String, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
#
# @!attribute [rw] state_province
#   @return [String, nil]
#
# @!attribute [rw] street
#   @return [String, nil]
#
# @!attribute [rw] website_url
#   @return [String, nil]
BreweryListMatch = Struct.new(
  :address_1,
  :address_2,
  :address_3,
  :brewery_type,
  :city,
  :country,
  :id,
  :latitude,
  :longitude,
  :name,
  :phone,
  :postal_code,
  :state,
  :state_province,
  :street,
  :website_url,
  keyword_init: true
)

