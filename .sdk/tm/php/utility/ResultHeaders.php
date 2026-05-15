<?php
declare(strict_types=1);

// OpenBreweryDb SDK utility: result_headers

class OpenBreweryDbResultHeaders
{
    public static function call(OpenBreweryDbContext $ctx): ?OpenBreweryDbResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
