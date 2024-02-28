import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import { faker } from '@faker-js/faker'

export default class extends BaseSeeder {
  async run() {
    for (let i = 0; i < 10; i++) {
      await User.create({
        email: faker.internet.email(),
        password: 'password',
      })
    }
  }
}
