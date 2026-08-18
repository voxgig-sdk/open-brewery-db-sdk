<?php
declare(strict_types=1);

// OpenBreweryDb SDK configuration

class OpenBreweryDbConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "OpenBreweryDb",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://api.openbrewerydb.org/v1",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "brewery" => [],
                ],
            ],
            "entity" => [
        'brewery' => [
          'fields' => [
            [
              'name' => 'address_1',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'address_2',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'address_3',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'brewery_type',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'city',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'country',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'latitude',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'longitude',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'phone',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'postal_code',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'state',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'state_province',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'street',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'website_url',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'brewery',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'by_city',
                        'orig' => 'by_city',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'by_country',
                        'orig' => 'by_country',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'by_name',
                        'orig' => 'by_name',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'by_postal',
                        'orig' => 'by_postal',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'by_state',
                        'orig' => 'by_state',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'by_type',
                        'orig' => 'by_type',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 1,
                        'kind' => 'query',
                        'name' => 'page',
                        'orig' => 'page',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 50,
                        'kind' => 'query',
                        'name' => 'per_page',
                        'orig' => 'per_page',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/breweries',
                  'parts' => [
                    'breweries',
                  ],
                  'select' => [
                    'exist' => [
                      'by_city',
                      'by_country',
                      'by_name',
                      'by_postal',
                      'by_state',
                      'by_type',
                      'page',
                      'per_page',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/breweries/{id}',
                  'parts' => [
                    'breweries',
                    '{id}',
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return OpenBreweryDbFeatures::make_feature($name);
    }
}
