
import { Context } from './Context'


class OpenBreweryDbError extends Error {

  isOpenBreweryDbError = true

  sdk = 'OpenBreweryDb'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  OpenBreweryDbError
}

