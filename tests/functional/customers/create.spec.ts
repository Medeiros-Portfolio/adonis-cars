import CustomerService from '#services/customer_service'
import app from '@adonisjs/core/services/app'
import { test } from '@japa/runner'

test.group('Customers create', () => {
  test('should create a customer', async ({ assert }) => {
    const service = await app.container.make(CustomerService)
    const customer = await service.createCustomer({
      firstName: 'Jack',
      lastName: 'Daniels',
    })

    assert.exists(customer.id)
  })
})
