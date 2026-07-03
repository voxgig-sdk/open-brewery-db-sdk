# OpenBreweryDb SDK

Open Brewery DB client, generated from the OpenAPI spec.

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

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

## Quickstart

### TypeScript

```ts
import { OpenBreweryDbSDK } from 'open-brewery-db'

const client = new OpenBreweryDbSDK({
  apikey: process.env.OPEN-BREWERY-DB_APIKEY,
})

// List all brewerys
const brewerys = await client.Brewery().list()
console.log(brewerys.data)
```

See the [TypeScript README](ts/README.md) for the full guide.

## Surfaces

| Surface | Path |
| --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | `go-cli/` |
| **MCP server** | `go-mcp/` |

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
| **Brewery** |  | `/breweries` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
import os
from openbrewerydb_sdk import OpenBreweryDbSDK

client = OpenBreweryDbSDK({
    "apikey": os.environ.get("OPEN-BREWERY-DB_APIKEY"),
})

# List all brewerys
brewerys, err = client.Brewery().list()
print(brewerys)

# Load a specific brewery
brewery, err = client.Brewery().load({"id": "example_id"})
print(brewery)
```

### PHP

```php
<?php
require_once 'openbrewerydb_sdk.php';

$client = new OpenBreweryDbSDK([
    "apikey" => getenv("OPEN-BREWERY-DB_APIKEY"),
]);

// List all brewerys
[$brewerys, $err] = $client->Brewery()->list();
print_r($brewerys);

// Load a specific brewery
[$brewery, $err] = $client->Brewery()->load(["id" => "example_id"]);
print_r($brewery);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/open-brewery-db-sdk/go"

client := sdk.NewOpenBreweryDbSDK(map[string]any{
    "apikey": os.Getenv("OPEN-BREWERY-DB_APIKEY"),
})

// List all brewerys
brewerys, err := client.Brewery(nil).List(nil, nil)
fmt.Println(brewerys)
```

### Ruby

```ruby
require_relative "OpenBreweryDb_sdk"

client = OpenBreweryDbSDK.new({
  "apikey" => ENV["OPEN-BREWERY-DB_APIKEY"],
})

# List all brewerys
brewerys, err = client.Brewery().list
puts brewerys

# Load a specific brewery
brewery, err = client.Brewery().load({ "id" => "example_id" })
puts brewery
```

### Lua

```lua
local sdk = require("open-brewery-db_sdk")

local client = sdk.new({
  apikey = os.getenv("OPEN-BREWERY-DB_APIKEY"),
})

-- List all brewerys
local brewerys, err = client:Brewery():list()
print(brewerys)

-- Load a specific brewery
local brewery, err = client:Brewery():load({ id = "example_id" })
print(brewery)
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
client = OpenBreweryDbSDK.test()
result, err = client.Brewery().load({"id": "test01"})
```

### PHP

```php
$client = OpenBreweryDbSDK::test();
[$result, $err] = $client->Brewery()->load(["id" => "test01"]);
```

### Golang

```go
client := sdk.Test()
result, err := client.Brewery(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = OpenBreweryDbSDK.test
result, err = client.Brewery().load({ "id" => "test01" })
```

### Lua

```lua
local client = sdk.test()
local result, err = client:Brewery():load({ id = "test01" })
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

---

Generated from the Open Brewery DB OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
