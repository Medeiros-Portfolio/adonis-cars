import type { HttpContext } from '@adonisjs/core/http'
import CarService from '#services/car_service'
import { inject } from '@adonisjs/core'
import { SearchParams, createCarValidator } from '#validators/create_car'
import { createCarAbility } from '#abilities/main'

@inject()
export default class InventoryController {
  constructor(protected carService: CarService) {}

  async create({ request, response, bouncer, auth }: HttpContext) {
    if (await bouncer.denies(createCarAbility)) {
      return response.unauthorized()
    }

    const payload = await request.validateUsing(createCarValidator)

    const user = auth.getUserOrFail()

    const car = await this.carService.create(payload, user.id)

    return response.created(car)
  }

  async available({ request, response }: HttpContext) {
    const page = request.input('page', 1)

    const cars = await this.carService.getAvailable(page)

    return response.ok(cars)
  }

  async search({ request, response }: HttpContext) {
    const searchParams = request.qs() as SearchParams

    const cars = await this.carService.query(searchParams)

    return response.ok(cars)
  }
}
