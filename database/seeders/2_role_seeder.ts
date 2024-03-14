import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { faker } from '@faker-js/faker'
import Role from '#models/role'

export default class extends BaseSeeder {
  async run() {
    const roles = [
      {
        title: 'manager',
        baseSalary: faker.number.float({
          min: 50000,
          max: 100000,
          multipleOf: 0.01,
        }),
      },
      {
        title: 'vendor',
        baseSalary: faker.number.float({
          min: 30000,
          max: 60000,
          multipleOf: 0.01,
        }),
      },
      {
        title: 'accountant',
        baseSalary: faker.number.float({
          min: 40000,
          max: 80000,
          multipleOf: 0.01,
        }),
      },
    ]

    await Role.createMany(roles)
  }
}
