-- Typed models for the OpenBreweryDb SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Brewery
---@field address_1? string
---@field address_2? string
---@field address_3? string
---@field brewery_type string
---@field city string
---@field country string
---@field id string
---@field latitude? string
---@field longitude? string
---@field name string
---@field phone? string
---@field postal_code? string
---@field state? string
---@field state_province? string
---@field street? string
---@field website_url? string

---@class BreweryLoadMatch
---@field id string

---@class BreweryListMatch

local M = {}

return M
