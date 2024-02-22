import { Exception } from '@adonisjs/core/exceptions'

export default class CreateCarFailedException extends Exception {
  static status = 500
}
