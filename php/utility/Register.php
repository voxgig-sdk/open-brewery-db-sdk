<?php
declare(strict_types=1);

// OpenBreweryDb SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

OpenBreweryDbUtility::setRegistrar(function (OpenBreweryDbUtility $u): void {
    $u->clean = [OpenBreweryDbClean::class, 'call'];
    $u->done = [OpenBreweryDbDone::class, 'call'];
    $u->make_error = [OpenBreweryDbMakeError::class, 'call'];
    $u->feature_add = [OpenBreweryDbFeatureAdd::class, 'call'];
    $u->feature_hook = [OpenBreweryDbFeatureHook::class, 'call'];
    $u->feature_init = [OpenBreweryDbFeatureInit::class, 'call'];
    $u->fetcher = [OpenBreweryDbFetcher::class, 'call'];
    $u->make_fetch_def = [OpenBreweryDbMakeFetchDef::class, 'call'];
    $u->make_context = [OpenBreweryDbMakeContext::class, 'call'];
    $u->make_options = [OpenBreweryDbMakeOptions::class, 'call'];
    $u->make_request = [OpenBreweryDbMakeRequest::class, 'call'];
    $u->make_response = [OpenBreweryDbMakeResponse::class, 'call'];
    $u->make_result = [OpenBreweryDbMakeResult::class, 'call'];
    $u->make_point = [OpenBreweryDbMakePoint::class, 'call'];
    $u->make_spec = [OpenBreweryDbMakeSpec::class, 'call'];
    $u->make_url = [OpenBreweryDbMakeUrl::class, 'call'];
    $u->param = [OpenBreweryDbParam::class, 'call'];
    $u->prepare_auth = [OpenBreweryDbPrepareAuth::class, 'call'];
    $u->prepare_body = [OpenBreweryDbPrepareBody::class, 'call'];
    $u->prepare_headers = [OpenBreweryDbPrepareHeaders::class, 'call'];
    $u->prepare_method = [OpenBreweryDbPrepareMethod::class, 'call'];
    $u->prepare_params = [OpenBreweryDbPrepareParams::class, 'call'];
    $u->prepare_path = [OpenBreweryDbPreparePath::class, 'call'];
    $u->prepare_query = [OpenBreweryDbPrepareQuery::class, 'call'];
    $u->result_basic = [OpenBreweryDbResultBasic::class, 'call'];
    $u->result_body = [OpenBreweryDbResultBody::class, 'call'];
    $u->result_headers = [OpenBreweryDbResultHeaders::class, 'call'];
    $u->transform_request = [OpenBreweryDbTransformRequest::class, 'call'];
    $u->transform_response = [OpenBreweryDbTransformResponse::class, 'call'];
});
