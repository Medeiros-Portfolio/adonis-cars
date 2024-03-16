import CustomerService from '#services/customer_service'
import app from '@adonisjs/core/services/app'
import { test } from '@japa/runner'

test.group('Customers create', (group) => {
  let service: CustomerService

  group.setup(async () => {
    service = await app.container.make(CustomerService)
  })

  test('should create a customer', async ({ assert }) => {
    await app.container.make(CustomerService)
    const customer = await service.createCustomer({
      firstName: 'Jack',
      lastName: 'Daniels',
    })

    assert.exists(customer.id)
  })

  test('should not create a customer when input is invalid', async () => {
    await service.createCustomer({
      firstName: 'Jack',
    } as any)
  }).throws(/NOT NULL constraint/)
})
