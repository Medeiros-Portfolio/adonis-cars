import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Store from '#models/store'
import { faker } from '@faker-js/faker'

export default class extends BaseSeeder {
  async run() {
    const store = await Store.findOrFail(1)

    for (let i = 0; i < 50; i++) {
      const storePrice = faker.number.float({
        min: 10000,
        max: 50000,
        multipleOf: 0.01,
      })
      const profit = faker.number.int({ min: 1000, max: 5000 })

      await store.related('cars').create({
        make: faker.vehicle.manufacturer(),
        model: faker.vehicle.model(),
        year: faker.date.past({ years: 10 }).getFullYear(),
        licensePlate: faker.vehicle.vrm(),
        color: faker.vehicle.color(),
        storePrice,
        sellPrice: storePrice + profit,
      })
    }
  }
}
