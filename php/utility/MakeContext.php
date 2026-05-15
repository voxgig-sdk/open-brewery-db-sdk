<?php
declare(strict_types=1);

// OpenBreweryDb SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class OpenBreweryDbMakeContext
{
    public static function call(array $ctxmap, ?OpenBreweryDbContext $basectx): OpenBreweryDbContext
    {
        return new OpenBreweryDbContext($ctxmap, $basectx);
    }
}
