import app from '@adonisjs/core/services/app'
import { test } from '@japa/runner'
import InventoryService from '../../../app/services/inventory_service.js'
import { cars } from '#mock/car.example'

test.group('Inventory service', (group) => {
  let inventoryService: InventoryService

  group.setup(async () => {
    inventoryService = await app.container.make(InventoryService)
  })

  test('should add a car to the database', async ({ assert }) => {
    const car = cars.fourth

    assert.doesNotReject(async () => inventoryService.addCar(car))
  })

  test('should get available cars', async ({ assert }) => {
    const result = await inventoryService.getAvailableCars()

    assert.isArray(result)
  })

  test('should be able to query cars', async ({ assert }) => {
    const result = await inventoryService.find({ brand: 'Toyota' })
    assert.plan(result.total + 1)

    assert.isArray(result)

    result.forEach((car) => {
      assert.equal(car.brand, 'Toyota')
    })
  })
})
