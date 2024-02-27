import Manager from '#models/manager'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class VendorPolicy extends BasePolicy {
  create(user: Manager): AuthorizerResponse {
    return user instanceof Manager
  }
}
