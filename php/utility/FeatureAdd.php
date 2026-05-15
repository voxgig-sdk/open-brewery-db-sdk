<?php
declare(strict_types=1);

// OpenBreweryDb SDK utility: feature_add

class OpenBreweryDbFeatureAdd
{
    public static function call(OpenBreweryDbContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
