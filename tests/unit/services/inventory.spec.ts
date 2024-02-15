import app from '@adonisjs/core/services/app'
import { test } from '@japa/runner'
import InventoryService from '../../../app/services/inventory_service.js'

test.group('Inventory service', (group) => {
  let inventoryService: InventoryService

  group.setup(async () => {
    inventoryService = await app.container.make(InventoryService)
  })

  test('should add a car to the database', async ({ assert }) => {
    const car = { brand: 'Toyota', model: 'Corolla', year: 2018, mileage: 10000, price: 20000 }

    assert.doesNotReject(async () => inventoryService.addCar(car))
  })

  test('should get available cars', async ({ assert }) => {
    const result = await inventoryService.getAvailableCars()

    assert.isArray(result)
  })
})
