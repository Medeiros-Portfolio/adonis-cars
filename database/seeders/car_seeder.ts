import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Car from '#models/car'
import { cars } from '#mock/car.example'

export default class extends BaseSeeder {
  async run() {
    const { first, second, third } = cars
    await Car.createMany([first, second, third])
  }
}
