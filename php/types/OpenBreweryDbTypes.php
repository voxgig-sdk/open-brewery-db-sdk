<?php
declare(strict_types=1);

// Typed models for the OpenBreweryDb SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Brewery entity data model. */
class Brewery
{
    public ?string $address_1 = null;
    public ?string $address_2 = null;
    public ?string $address_3 = null;
    public string $brewery_type;
    public string $city;
    public string $country;
    public string $id;
    public ?string $latitude = null;
    public ?string $longitude = null;
    public string $name;
    public ?string $phone = null;
    public ?string $postal_code = null;
    public ?string $state = null;
    public ?string $state_province = null;
    public ?string $street = null;
    public ?string $website_url = null;
}

/** Request payload for Brewery#load. */
class BreweryLoadMatch
{
    public string $id;
}

/** Match filter for Brewery#list (any subset of Brewery fields). */
class BreweryListMatch
{
    public ?string $address_1 = null;
    public ?string $address_2 = null;
    public ?string $address_3 = null;
    public ?string $brewery_type = null;
    public ?string $city = null;
    public ?string $country = null;
    public ?string $id = null;
    public ?string $latitude = null;
    public ?string $longitude = null;
    public ?string $name = null;
    public ?string $phone = null;
    public ?string $postal_code = null;
    public ?string $state = null;
    public ?string $state_province = null;
    public ?string $street = null;
    public ?string $website_url = null;
}

