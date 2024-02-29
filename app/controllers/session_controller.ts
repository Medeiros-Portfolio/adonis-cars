import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class SessionController {
  async login({ auth, request, response }: HttpContext) {
    const { email, password } = request.body()

    const user = await User.verifyCredentials(email, password)

    if (!user) {
      return response.badRequest('Invalid credentials')
    }

    await auth.use('staff').login(user)

    response.noContent()
  }
}
