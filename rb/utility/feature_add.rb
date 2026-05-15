# OpenBreweryDb SDK utility: feature_add
module OpenBreweryDbUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
