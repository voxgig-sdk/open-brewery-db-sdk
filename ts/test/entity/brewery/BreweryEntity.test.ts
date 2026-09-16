

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { OpenBreweryDbSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('BreweryEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when OPEN_BREWERY_DB_TEST_LIVE=TRUE.
  afterEach(liveDelay('OPEN_BREWERY_DB_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OpenBreweryDbSDK.test()
    const ent = testsdk.Brewery()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.OPEN_BREWERY_DB_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'brewery.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"address_1","req":false,"short":"Street address line 1","type":"`$STRING`","index$":0},{"active":true,"name":"address_2","req":false,"short":"Street address line 2","type":"`$STRING`","index$":1},{"active":true,"name":"address_3","req":false,"short":"Street address line 3","type":"`$STRING`","index$":2},{"active":true,"name":"brewery_type","req":true,"short":"Type of brewery","type":"`$STRING`","index$":3},{"active":true,"name":"city","req":true,"short":"City where the brewery is located","type":"`$STRING`","index$":4},{"active":true,"name":"country","req":true,"short":"Country","type":"`$STRING`","index$":5},{"active":true,"name":"id","req":true,"short":"Unique identifier for the brewery","type":"`$STRING`","index$":6},{"active":true,"name":"latitude","req":false,"short":"Latitude coordinate","type":"`$STRING`","index$":7},{"active":true,"name":"longitude","req":false,"short":"Longitude coordinate","type":"`$STRING`","index$":8},{"active":true,"name":"name","req":true,"short":"Name of the brewery","type":"`$STRING`","index$":9},{"active":true,"name":"phone","req":false,"short":"Phone number","type":"`$STRING`","index$":10},{"active":true,"name":"postal_code","req":false,"short":"Postal/ZIP code","type":"`$STRING`","index$":11},{"active":true,"name":"state","req":false,"short":"State abbreviation","type":"`$STRING`","index$":12},{"active":true,"name":"state_province","req":false,"short":"State or province","type":"`$STRING`","index$":13},{"active":true,"name":"street","req":false,"short":"Full street address","type":"`$STRING`","index$":14},{"active":true,"name":"website_url","req":false,"short":"Website URL","type":"`$STRING`","index$":15}],"id":{"field":"id","name":"id"},"name":"brewery","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"by_city","orig":"by_city","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"by_country","orig":"by_country","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"kind":"query","name":"by_name","orig":"by_name","reqd":false,"type":"`$STRING`","index$":2},{"active":true,"kind":"query","name":"by_postal","orig":"by_postal","reqd":false,"type":"`$STRING`","index$":3},{"active":true,"kind":"query","name":"by_state","orig":"by_state","reqd":false,"type":"`$STRING`","index$":4},{"active":true,"kind":"query","name":"by_type","orig":"by_type","reqd":false,"type":"`$STRING`","index$":5},{"active":true,"example":1,"kind":"query","name":"page","orig":"page","reqd":false,"type":"`$INTEGER`","index$":6},{"active":true,"example":50,"kind":"query","name":"per_page","orig":"per_page","reqd":false,"type":"`$INTEGER`","index$":7}]},"contract":{"id":"GET /breweries","json":"{\"operationId\":\"listBreweries\",\"parameters\":[{\"description\":\"Filter breweries by city\",\"in\":\"query\",\"name\":\"by_city\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Filter breweries by state\",\"in\":\"query\",\"name\":\"by_state\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Filter breweries by name\",\"in\":\"query\",\"name\":\"by_name\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Filter by type of brewery\",\"in\":\"query\",\"name\":\"by_type\",\"required\":false,\"schema\":{\"enum\":[\"micro\",\"nano\",\"regional\",\"brewpub\",\"large\",\"planning\",\"bar\",\"contract\",\"proprietor\",\"closed\"],\"type\":\"string\"}},{\"description\":\"Filter breweries by postal code\",\"in\":\"query\",\"name\":\"by_postal\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Filter breweries by country\",\"in\":\"query\",\"name\":\"by_country\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Page number for pagination\",\"in\":\"query\",\"name\":\"page\",\"required\":false,\"schema\":{\"default\":1,\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"Number of breweries per page\",\"in\":\"query\",\"name\":\"per_page\",\"required\":false,\"schema\":{\"default\":50,\"maximum\":200,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"address_1\":{\"description\":\"Street address line 1\",\"nullable\":true,\"type\":\"string\"},\"address_2\":{\"description\":\"Street address line 2\",\"nullable\":true,\"type\":\"string\"},\"address_3\":{\"description\":\"Street address line 3\",\"nullable\":true,\"type\":\"string\"},\"brewery_type\":{\"description\":\"Type of brewery\",\"enum\":[\"micro\",\"nano\",\"regional\",\"brewpub\",\"large\",\"planning\",\"bar\",\"contract\",\"proprietor\",\"closed\"],\"type\":\"string\"},\"city\":{\"description\":\"City where the brewery is located\",\"type\":\"string\"},\"country\":{\"description\":\"Country\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the brewery\",\"type\":\"string\"},\"latitude\":{\"description\":\"Latitude coordinate\",\"nullable\":true,\"type\":\"string\"},\"longitude\":{\"description\":\"Longitude coordinate\",\"nullable\":true,\"type\":\"string\"},\"name\":{\"description\":\"Name of the brewery\",\"type\":\"string\"},\"phone\":{\"description\":\"Phone number\",\"nullable\":true,\"type\":\"string\"},\"postal_code\":{\"description\":\"Postal/ZIP code\",\"type\":\"string\"},\"state\":{\"description\":\"State abbreviation\",\"type\":\"string\"},\"state_province\":{\"description\":\"State or province\",\"type\":\"string\"},\"street\":{\"description\":\"Full street address\",\"nullable\":true,\"type\":\"string\"},\"website_url\":{\"description\":\"Website URL\",\"nullable\":true,\"type\":\"string\"}},\"required\":[\"id\",\"name\",\"brewery_type\",\"city\",\"country\"],\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response\"},\"400\":{\"description\":\"Bad request\"},\"500\":{\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/breweries","segments":[{"lit":"breweries"}],"select":{"exist":["by_city","by_country","by_name","by_postal","by_state","by_type","page","per_page"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /breweries/{id}","json":"{\"operationId\":\"getBreweryById\",\"parameters\":[{\"description\":\"Unique identifier of the brewery\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"address_1\":{\"description\":\"Street address line 1\",\"nullable\":true,\"type\":\"string\"},\"address_2\":{\"description\":\"Street address line 2\",\"nullable\":true,\"type\":\"string\"},\"address_3\":{\"description\":\"Street address line 3\",\"nullable\":true,\"type\":\"string\"},\"brewery_type\":{\"description\":\"Type of brewery\",\"enum\":[\"micro\",\"nano\",\"regional\",\"brewpub\",\"large\",\"planning\",\"bar\",\"contract\",\"proprietor\",\"closed\"],\"type\":\"string\"},\"city\":{\"description\":\"City where the brewery is located\",\"type\":\"string\"},\"country\":{\"description\":\"Country\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the brewery\",\"type\":\"string\"},\"latitude\":{\"description\":\"Latitude coordinate\",\"nullable\":true,\"type\":\"string\"},\"longitude\":{\"description\":\"Longitude coordinate\",\"nullable\":true,\"type\":\"string\"},\"name\":{\"description\":\"Name of the brewery\",\"type\":\"string\"},\"phone\":{\"description\":\"Phone number\",\"nullable\":true,\"type\":\"string\"},\"postal_code\":{\"description\":\"Postal/ZIP code\",\"type\":\"string\"},\"state\":{\"description\":\"State abbreviation\",\"type\":\"string\"},\"state_province\":{\"description\":\"State or province\",\"type\":\"string\"},\"street\":{\"description\":\"Full street address\",\"nullable\":true,\"type\":\"string\"},\"website_url\":{\"description\":\"Website URL\",\"nullable\":true,\"type\":\"string\"}},\"required\":[\"id\",\"name\",\"brewery_type\",\"city\",\"country\"],\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"Brewery not found\"},\"500\":{\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/breweries/{id}","segments":[{"lit":"breweries"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"brewery","name__orig":"brewery","Name":"Brewery","name_":"brewery","name-":"brewery","NAME":"BREWERY","index$":0}, {"active":true,"entity":"brewery","key$":"BasicBreweryFlow","kind":"basic","name":"BasicBreweryFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"brewery_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"brewery_ref01","srcdatavar":"brewery_ref01_data","suffix":"_dt0"},"match":{"id":"brewery01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-brewery_ref01"}}],"index$":1}]}, 'Brewery')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let brewery_ref01_data = Object.values(setup.data.existing.brewery)[0] as any

    // LIST
    const brewery_ref01_ent = client.Brewery()
    const brewery_ref01_match: any = {}

    const brewery_ref01_list = (await brewery_ref01_ent.list(brewery_ref01_match)).map((e: any) => e.data())


    // LOAD
    const brewery_ref01_match_dt0: any = {}
    brewery_ref01_match_dt0.id = brewery_ref01_data.id
    const brewery_ref01_data_dt0 = (await brewery_ref01_ent.load(brewery_ref01_match_dt0)).data()
    assert(brewery_ref01_data_dt0.id === brewery_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/brewery/BreweryTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = OpenBreweryDbSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['brewery01','brewery02','brewery03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'OPEN_BREWERY_DB_TEST_BREWERY_ENTID': idmap,
    'OPEN_BREWERY_DB_TEST_LIVE': 'FALSE',
    'OPEN_BREWERY_DB_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['OPEN_BREWERY_DB_TEST_BREWERY_ENTID']

  const live = 'TRUE' === env.OPEN_BREWERY_DB_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['OPEN_BREWERY_DB_TEST_BREWERY_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new OpenBreweryDbSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.OPEN_BREWERY_DB_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
