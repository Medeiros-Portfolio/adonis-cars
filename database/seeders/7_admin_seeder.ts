import Admin from '#models/admin'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Admin.create({
      email: 'admin@admin.fake',
      password: 'admin1234',
    })
  }
}
