import { Exception } from '@adonisjs/core/exceptions'

export default class EmailAlreadyExistsException extends Exception {
  static status = 400
}
