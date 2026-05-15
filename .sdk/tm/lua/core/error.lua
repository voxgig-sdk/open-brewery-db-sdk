-- OpenBreweryDb SDK error

local OpenBreweryDbError = {}
OpenBreweryDbError.__index = OpenBreweryDbError


function OpenBreweryDbError.new(code, msg, ctx)
  local self = setmetatable({}, OpenBreweryDbError)
  self.is_sdk_error = true
  self.sdk = "OpenBreweryDb"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function OpenBreweryDbError:error()
  return self.msg
end


function OpenBreweryDbError:__tostring()
  return self.msg
end


return OpenBreweryDbError
