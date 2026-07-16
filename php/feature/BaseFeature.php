<?php
declare(strict_types=1);

// OpenBreweryDb SDK base feature

class OpenBreweryDbBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(OpenBreweryDbContext $ctx, array $options): void {}
    public function PostConstruct(OpenBreweryDbContext $ctx): void {}
    public function PostConstructEntity(OpenBreweryDbContext $ctx): void {}
    public function SetData(OpenBreweryDbContext $ctx): void {}
    public function GetData(OpenBreweryDbContext $ctx): void {}
    public function GetMatch(OpenBreweryDbContext $ctx): void {}
    public function SetMatch(OpenBreweryDbContext $ctx): void {}
    public function PrePoint(OpenBreweryDbContext $ctx): void {}
    public function PreSpec(OpenBreweryDbContext $ctx): void {}
    public function PreRequest(OpenBreweryDbContext $ctx): void {}
    public function PreResponse(OpenBreweryDbContext $ctx): void {}
    public function PreResult(OpenBreweryDbContext $ctx): void {}
    public function PreDone(OpenBreweryDbContext $ctx): void {}
    public function PreUnexpected(OpenBreweryDbContext $ctx): void {}
}
