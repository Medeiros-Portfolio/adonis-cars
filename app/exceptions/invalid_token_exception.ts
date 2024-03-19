import { Exception } from '@adonisjs/core/exceptions'

export default class InvalidTokenException extends Exception {
  static status = 400

  static message = 'Invalid token'
}
