import { Exception } from '@adonisjs/core/exceptions'

export default class CarAlreadySoldException extends Exception {
  static status = 400
  static code = 'CAR_ALREADY_SOLD'
  static message = 'Car has already been sold'
}
