import type { HttpContext } from '@adonisjs/core/http'
import PasswordService from '#services/password_service'
import { inject } from '@adonisjs/core'
import { resetPasswordValidator } from '#validators/reset_password'

@inject()
export default class AuthController {
  constructor(protected passwordService: PasswordService) {}

  async forgotPassword({ request, response }: HttpContext) {
    const email = request.input('email')

    await this.passwordService.forgotPassword(email)

    return response.noContent()
  }

  async confirmForgotPassword({ request, response }: HttpContext) {
    const data = request.body()

    const payload = await resetPasswordValidator.validate(data)

    await this.passwordService.confirmForgotPassword(payload)

    return response.status(200).json({ message: 'Password reset successfully' })
  }
}
