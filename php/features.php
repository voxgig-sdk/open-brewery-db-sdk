<?php
declare(strict_types=1);

// OpenBreweryDb SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class OpenBreweryDbFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new OpenBreweryDbBaseFeature();
            case "test":
                return new OpenBreweryDbTestFeature();
            default:
                return new OpenBreweryDbBaseFeature();
        }
    }
}
