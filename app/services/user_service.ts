import User from '#models/user'

export default class UserService {
  async createUser(email: string, password: string) {
    await User.create({ email, password })
  }
}
