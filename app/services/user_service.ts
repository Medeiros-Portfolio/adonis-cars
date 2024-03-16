import User from '#models/user'

export default class UserService {
  async createUser(email: string, password: string): Promise<User> {
    return User.create({ email, password })
  }
}
