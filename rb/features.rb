# OpenBreweryDb SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module OpenBreweryDbFeatures
  def self.make_feature(name)
    case name
    when "base"
      OpenBreweryDbBaseFeature.new
    when "ratelimit"
      OpenBreweryDbRatelimitFeature.new
    when "retry"
      OpenBreweryDbRetryFeature.new
    when "test"
      OpenBreweryDbTestFeature.new
    when "timeout"
      OpenBreweryDbTimeoutFeature.new
    else
      OpenBreweryDbBaseFeature.new
    end
  end
end
