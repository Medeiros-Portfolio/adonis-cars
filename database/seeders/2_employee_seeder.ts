import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import Store from '#models/store'
import { faker } from '@faker-js/faker'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    for (let i = 1; i <= 10; i++) {
      const user = await User.findOrFail(i)
      const store = await Store.findOrFail(1)

      const employee = await user.related('employee').create({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        gender: faker.person.sex(),
        dateOfBirth: DateTime.fromJSDate(faker.date.past({ years: 30 })),
      })

      await store.related('employees').save(employee)
    }
  }
}
