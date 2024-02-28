import Customer from '#models/customer'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { faker } from '@faker-js/faker'

export default class extends BaseSeeder {
  async run() {
    for (let i = 0; i < 10; i++) {
      await Customer.create({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
      })
    }
  }
}
