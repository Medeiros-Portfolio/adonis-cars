import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import Store from '#models/store'
import { faker } from '@faker-js/faker'
import { DateTime } from 'luxon'
import Role from '#models/role'

export default class extends BaseSeeder {
  async run() {
    for (let i = 1; i <= 10; i++) {
      const user = await User.findOrFail(i)
      const store = await Store.findOrFail(1)
      const vendorRole = await Role.findBy('title', 'vendor')
      const managerRole = await Role.findBy('title', 'manager')
      const accountantRole = await Role.findBy('title', 'accountant')

      const employee = await user.related('employee').create({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        gender: faker.person.sex(),
        dateOfBirth: DateTime.fromJSDate(faker.date.past({ years: 30 })),
      })

      await store.related('employees').save(employee)

      if (i <= 8) {
        await vendorRole?.related('employees').save(employee)
      } else if (i === 9) {
        await managerRole?.related('employees').save(employee)
      } else {
        await accountantRole?.related('employees').save(employee)
      }
    }
  }
}
