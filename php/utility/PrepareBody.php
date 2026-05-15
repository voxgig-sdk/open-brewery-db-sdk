<?php
declare(strict_types=1);

// OpenBreweryDb SDK utility: prepare_body

class OpenBreweryDbPrepareBody
{
    public static function call(OpenBreweryDbContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
