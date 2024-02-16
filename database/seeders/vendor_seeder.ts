import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Vendor from '#models/vendor'
import { vendors } from '../../tests/mock/vendor.example.js'

export default class extends BaseSeeder {
  async run() {
    const { first, second } = vendors
    await Vendor.createMany([first, second])
  }
}
