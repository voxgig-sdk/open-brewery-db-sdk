# OpenBreweryDb SDK

Free, open-source dataset and API of breweries, cideries, brewpubs, and bottleshops worldwide

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Open Brewery DB

[Open Brewery DB](https://www.openbrewerydb.org/) is a free, community-driven dataset and HTTP API providing public information about breweries, cideries, brewpubs, and bottleshops worldwide. It is maintained by a community of contributors on GitHub rather than a single commercial operator.

What you get from the API:

- A `GET /breweries` endpoint that returns a paginated list of brewery records.
- A `GET /breweries/{id}` endpoint that returns a single brewery by identifier.
- Public-facing information such as brewery name, type, and location-related fields.

The service is open and unauthenticated. CORS is disabled, so server-side or proxied requests may be required for browser clients. No formal rate limits are published, but the project is community-funded, so usage should be considerate.

## Try it

**TypeScript**
```bash
npm install open-brewery-db
```

**Python**
```bash
pip install open-brewery-db-sdk
```

**PHP**
```bash
composer require voxgig/open-brewery-db-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/open-brewery-db-sdk/go
```

**Ruby**
```bash
gem install open-brewery-db-sdk
```

**Lua**
```bash
luarocks install open-brewery-db-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { OpenBreweryDbSDK } from 'open-brewery-db'

const client = new OpenBreweryDbSDK({})

// List all brewerys
const brewerys = await client.Brewery().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o open-brewery-db-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "open-brewery-db": {
      "command": "/abs/path/to/open-brewery-db-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **Brewery** | A brewery, cidery, brewpub, or bottleshop record with public-facing information, exposed at `/breweries` (list) and `/breweries/{id}` (single). | `/breweries` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from openbrewerydb_sdk import OpenBreweryDbSDK

client = OpenBreweryDbSDK({})

# List all brewerys
brewerys, err = client.Brewery(None).list(None, None)

# Load a specific brewery
brewery, err = client.Brewery(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'openbrewerydb_sdk.php';

$client = new OpenBreweryDbSDK([]);

// List all brewerys
[$brewerys, $err] = $client->Brewery(null)->list(null, null);

// Load a specific brewery
[$brewery, $err] = $client->Brewery(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/open-brewery-db-sdk/go"

client := sdk.NewOpenBreweryDbSDK(map[string]any{})

// List all brewerys
brewerys, err := client.Brewery(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "OpenBreweryDb_sdk"

client = OpenBreweryDbSDK.new({})

# List all brewerys
brewerys, err = client.Brewery(nil).list(nil, nil)

# Load a specific brewery
brewery, err = client.Brewery(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("open-brewery-db_sdk")

local client = sdk.new({})

-- List all brewerys
local brewerys, err = client:Brewery(nil):list(nil, nil)

-- Load a specific brewery
local brewery, err = client:Brewery(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = OpenBreweryDbSDK.test()
const result = await client.Brewery().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = OpenBreweryDbSDK.test(None, None)
result, err = client.Brewery(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = OpenBreweryDbSDK::test(null, null);
[$result, $err] = $client->Brewery(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Brewery(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = OpenBreweryDbSDK.test(nil, nil)
result, err = client.Brewery(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Brewery(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Open Brewery DB

- Upstream: [https://www.openbrewerydb.org/](https://www.openbrewerydb.org/)
- API docs: [https://www.openbrewerydb.org/documentation](https://www.openbrewerydb.org/documentation)

- Open Brewery DB is a free, open-source project maintained by a community of contributors on GitHub.
- No authentication or API key is required to access the data.
- CORS is reported as disabled, so calls from browsers may need a proxy.
- Attribution to Open Brewery DB is appreciated when redistributing the data.

---

Generated from the Open Brewery DB OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
