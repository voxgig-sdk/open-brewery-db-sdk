# Typed models for the OpenBreweryDb SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Brewery:
    brewery_type: str
    city: str
    country: str
    id: str
    name: str
    address_1: Optional[str] = None
    address_2: Optional[str] = None
    address_3: Optional[str] = None
    latitude: Optional[str] = None
    longitude: Optional[str] = None
    phone: Optional[str] = None
    postal_code: Optional[str] = None
    state: Optional[str] = None
    state_province: Optional[str] = None
    street: Optional[str] = None
    website_url: Optional[str] = None


@dataclass
class BreweryLoadMatch:
    id: str


@dataclass
class BreweryListMatch:
    address_1: Optional[str] = None
    address_2: Optional[str] = None
    address_3: Optional[str] = None
    brewery_type: Optional[str] = None
    city: Optional[str] = None
    country: Optional[str] = None
    id: Optional[str] = None
    latitude: Optional[str] = None
    longitude: Optional[str] = None
    name: Optional[str] = None
    phone: Optional[str] = None
    postal_code: Optional[str] = None
    state: Optional[str] = None
    state_province: Optional[str] = None
    street: Optional[str] = None
    website_url: Optional[str] = None

