import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Employee from '#models/employee'
import { faker } from '@faker-js/faker'

export default class extends BaseSeeder {
  async run() {
    const roles = {
      manager: {
        title: 'manager',
        baseSalary: faker.number.float({
          min: 50000,
          max: 100000,
          multipleOf: 0.01,
        }),
      },
      vendor: {
        title: 'vendor',
        baseSalary: faker.number.float({
          min: 30000,
          max: 60000,
          multipleOf: 0.01,
        }),
      },
      accountant: {
        title: 'accountant',
        baseSalary: faker.number.float({
          min: 40000,
          max: 80000,
          multipleOf: 0.01,
        }),
      },
    }

    const [first, second, ...employees] = await Employee.all()

    await first.related('role').create(roles.manager)
    await second.related('role').create(roles.accountant)
    for (const employee of employees) {
      await employee.related('role').create(roles.vendor)
    }
  }
}
