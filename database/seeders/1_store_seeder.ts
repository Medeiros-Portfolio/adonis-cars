import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Store from '#models/store'
import { faker } from '@faker-js/faker'

export default class extends BaseSeeder {
  async run() {
    await Store.create({
      name: faker.company.name(),
      address: faker.location.streetAddress(),
    })
  }
}
