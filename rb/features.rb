# OpenBreweryDb SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module OpenBreweryDbFeatures
  def self.make_feature(name)
    case name
    when "base"
      OpenBreweryDbBaseFeature.new
    when "test"
      OpenBreweryDbTestFeature.new
    else
      OpenBreweryDbBaseFeature.new
    end
  end
end
