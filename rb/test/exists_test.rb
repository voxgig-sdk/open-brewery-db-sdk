# OpenBreweryDb SDK exists test

require "minitest/autorun"
require_relative "../OpenBreweryDb_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = OpenBreweryDbSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
