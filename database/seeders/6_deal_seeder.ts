import Car from '#models/car'
import Customer from '#models/customer'
import Deal from '#models/deal'
import Employee from '#models/employee'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { faker } from '@faker-js/faker'

export default class extends BaseSeeder {
  async run() {
    const employee = await Employee.findOrFail(1)

    for (let i = 1; i <= 5; i++) {
      const car = await Car.findOrFail(i)
      const customer = await Customer.findOrFail(i)

      const deal = await Deal.create({
        pricePaid:
          car.sellPrice +
          faker.number.int({
            min: 1000,
            max: 10000,
          }),
      })

      await car.related('deal').save(deal)
      await customer.related('deal').save(deal)
      await employee.related('deal').save(deal)
    }
  }
}
