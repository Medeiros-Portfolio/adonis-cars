import Vendor from '#models/vendor'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class CarPolicy extends BasePolicy {
  create(vendor: Vendor, isVendor: boolean): AuthorizerResponse {
    return isVendor
  }
}
