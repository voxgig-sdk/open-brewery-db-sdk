package = "voxgig-sdk-open-brewery-db"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/open-brewery-db-sdk.git"
}
description = {
  summary = "OpenBreweryDb SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["open-brewery-db_sdk"] = "open-brewery-db_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
