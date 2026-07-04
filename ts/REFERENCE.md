# OpenBreweryDb TypeScript SDK Reference

Complete API reference for the OpenBreweryDb TypeScript SDK.


## OpenBreweryDbSDK

### Constructor

```ts
new OpenBreweryDbSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `OpenBreweryDbSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = OpenBreweryDbSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `OpenBreweryDbSDK` instance in test mode.


### Instance Methods

#### `Brewery(data?: object)`

Create a new `Brewery` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BreweryEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `OpenBreweryDbSDK.test()`.

**Returns:** `OpenBreweryDbSDK` instance in test mode.


---

## BreweryEntity

```ts
const brewery = client.brewery
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address_1` | ``$STRING`` | No |  |
| `address_2` | ``$STRING`` | No |  |
| `address_3` | ``$STRING`` | No |  |
| `brewery_type` | ``$STRING`` | Yes |  |
| `city` | ``$STRING`` | Yes |  |
| `country` | ``$STRING`` | Yes |  |
| `id` | ``$STRING`` | Yes |  |
| `latitude` | ``$STRING`` | No |  |
| `longitude` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | Yes |  |
| `phone` | ``$STRING`` | No |  |
| `postal_code` | ``$STRING`` | No |  |
| `state` | ``$STRING`` | No |  |
| `state_province` | ``$STRING`` | No |  |
| `street` | ``$STRING`` | No |  |
| `website_url` | ``$STRING`` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.brewery.list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.brewery.load({ id: 'brewery_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BreweryEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenBreweryDbSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new OpenBreweryDbSDK({
  feature: {
    test: { active: true },
  }
})
```

