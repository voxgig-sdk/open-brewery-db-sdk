# OpenBreweryDb SDK utility: make_context
require_relative '../core/context'
module OpenBreweryDbUtilities
  MakeContext = ->(ctxmap, basectx) {
    OpenBreweryDbContext.new(ctxmap, basectx)
  }
end
