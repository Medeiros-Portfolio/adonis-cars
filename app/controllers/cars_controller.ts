import type { HttpContext } from '@adonisjs/core/http'
import { createCarValidator } from '../validators/car.js'
import { inject } from '@adonisjs/core/container'
import InventoryService from '../services/inventory_service.js'

@inject()
export default class CarsController {
  constructor(protected inventoryService: InventoryService) {}

  async create({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createCarValidator)

    await this.inventoryService.addCar(payload)

    response.created({
      message: 'Car added to the inventory',
    })
  }
}
