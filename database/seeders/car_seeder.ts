import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Car from '#models/car'

export default class extends BaseSeeder {
  async run() {
    await Car.createMany([
      {
        brand: 'Toyota',
        model: 'Corolla',
        year: 2018,
        mileage: 10000,
        price: 20000,
      },
      {
        brand: 'Honda',
        model: 'Civic',
        year: 2019,
        mileage: 5000,
        price: 25000,
      },
      {
        brand: 'Ford',
        model: 'Fiesta',
        year: 2017,
        mileage: 20000,
        price: 15000,
      },
    ])
  }
}
