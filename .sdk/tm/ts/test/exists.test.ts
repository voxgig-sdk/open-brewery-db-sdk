
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { OpenBreweryDbSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await OpenBreweryDbSDK.test()
    equal(null !== testsdk, true)
  })

})
