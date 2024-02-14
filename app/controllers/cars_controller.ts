import type { HttpContext } from '@adonisjs/core/http'
import { createCarValidator } from '../validators/car.js'
import { inject } from '@adonisjs/core/container'
import InventoryService from '../services/inventory_service.js'
import { searchCarValidator } from '../validators/car_search.js'

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

  async getAvailable({ response, request }: HttpContext) {
    const page = request.qs().page
    const cars = await this.inventoryService.getAvailableCars(page)

    response.ok(cars)
  }

  async search({ response, request }: HttpContext) {
    const { page, ...queryParams } = request.qs()

    const query = await searchCarValidator.validate(queryParams)

    const cars = await this.inventoryService.find(query, page)

    response.ok(cars)
  }
}
