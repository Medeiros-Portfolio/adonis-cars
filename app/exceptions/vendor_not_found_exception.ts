import { Exception } from '@adonisjs/core/exceptions'

export default class VendorNotFoundException extends Exception {
  static status = 400
}
