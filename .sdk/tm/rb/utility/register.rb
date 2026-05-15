# OpenBreweryDb SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

OpenBreweryDbUtility.registrar = ->(u) {
  u.clean = OpenBreweryDbUtilities::Clean
  u.done = OpenBreweryDbUtilities::Done
  u.make_error = OpenBreweryDbUtilities::MakeError
  u.feature_add = OpenBreweryDbUtilities::FeatureAdd
  u.feature_hook = OpenBreweryDbUtilities::FeatureHook
  u.feature_init = OpenBreweryDbUtilities::FeatureInit
  u.fetcher = OpenBreweryDbUtilities::Fetcher
  u.make_fetch_def = OpenBreweryDbUtilities::MakeFetchDef
  u.make_context = OpenBreweryDbUtilities::MakeContext
  u.make_options = OpenBreweryDbUtilities::MakeOptions
  u.make_request = OpenBreweryDbUtilities::MakeRequest
  u.make_response = OpenBreweryDbUtilities::MakeResponse
  u.make_result = OpenBreweryDbUtilities::MakeResult
  u.make_point = OpenBreweryDbUtilities::MakePoint
  u.make_spec = OpenBreweryDbUtilities::MakeSpec
  u.make_url = OpenBreweryDbUtilities::MakeUrl
  u.param = OpenBreweryDbUtilities::Param
  u.prepare_auth = OpenBreweryDbUtilities::PrepareAuth
  u.prepare_body = OpenBreweryDbUtilities::PrepareBody
  u.prepare_headers = OpenBreweryDbUtilities::PrepareHeaders
  u.prepare_method = OpenBreweryDbUtilities::PrepareMethod
  u.prepare_params = OpenBreweryDbUtilities::PrepareParams
  u.prepare_path = OpenBreweryDbUtilities::PreparePath
  u.prepare_query = OpenBreweryDbUtilities::PrepareQuery
  u.result_basic = OpenBreweryDbUtilities::ResultBasic
  u.result_body = OpenBreweryDbUtilities::ResultBody
  u.result_headers = OpenBreweryDbUtilities::ResultHeaders
  u.transform_request = OpenBreweryDbUtilities::TransformRequest
  u.transform_response = OpenBreweryDbUtilities::TransformResponse
}
