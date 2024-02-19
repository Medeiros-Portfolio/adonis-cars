import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Vendor from '#models/vendor'
import { vendors } from '../../tests/mock/vendor.example.js'

export default class extends BaseSeeder {
  async run() {
    const { first, second, third } = vendors
    const MOCK_PASSWORD = 'password'

    const validVendors = [first, second, third].map((vendor) => {
      return { ...vendor, password: MOCK_PASSWORD }
    })

    await Vendor.createMany(validVendors)
  }
}
