# Typed models for the OpenBreweryDb SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class BreweryRequired(TypedDict):
    brewery_type: str
    city: str
    country: str
    id: str
    name: str


class Brewery(BreweryRequired, total=False):
    address_1: str
    address_2: str
    address_3: str
    latitude: str
    longitude: str
    phone: str
    postal_code: str
    state: str
    state_province: str
    street: str
    website_url: str


class BreweryLoadMatch(TypedDict):
    id: str


class BreweryListMatch(TypedDict, total=False):
    address_1: str
    address_2: str
    address_3: str
    brewery_type: str
    city: str
    country: str
    id: str
    latitude: str
    longitude: str
    name: str
    phone: str
    postal_code: str
    state: str
    state_province: str
    street: str
    website_url: str
