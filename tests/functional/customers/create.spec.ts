import Employee from '#models/employee'
import User from '#models/user'
import logger from '@adonisjs/core/services/logger'
import { test } from '@japa/runner'

test.group('Customers create', (group) => {
  let vendor: User

  group.setup(async () => {
    const employee = await Employee.findByOrFail('role_id', 2)
    vendor = await User.findOrFail(employee.userId)
  })

  test('should create a customer', async ({ client }) => {
    const response = await client
      .post('/customer')
      .loginAs(vendor)
      .json({
        firstName: 'Jack',
        lastName: 'Daniels',
      })
      .send()
    response.assertStatus(201)
  })
})
