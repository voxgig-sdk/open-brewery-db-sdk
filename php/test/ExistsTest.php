<?php
declare(strict_types=1);

// OpenBreweryDb SDK exists test

require_once __DIR__ . '/../openbrewerydb_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = OpenBreweryDbSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
