import Employee from '#models/employee'
import User from '#models/user'
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

  test('should not create a customer without proper authotization', async ({ client }) => {
    const response = await client
      .post('/customer')
      .json({
        firstName: 'Jack',
        lastName: 'Daniels',
      })
      .send()

    response.assertStatus(401)
  })

  test('should not create a customer with invalid data', async ({ client }) => {
    const response = await client
      .post('/customer')
      .loginAs(vendor)
      .json({
        firstName: 'Jack',
      })
      .send()

    response.assertStatus(422)
  })
})
