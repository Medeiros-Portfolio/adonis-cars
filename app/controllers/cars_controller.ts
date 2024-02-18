import type { HttpContext } from '@adonisjs/core/http'
import { createCarValidator } from '../validators/create_car.js'
import { inject } from '@adonisjs/core/container'
import InventoryService from '../services/inventory_service.js'
import { searchCarValidator } from '../validators/car_search.js'
import logger from '@adonisjs/core/services/logger'
import EmployeeService from '#services/employee_service'

@inject()
export default class CarsController {
  constructor(
    protected inventoryService: InventoryService,
    protected employeeService: EmployeeService
  ) {}

  async create({ request, response, bouncer, session }: HttpContext) {
    const user = session.get('auth_staff')

    logger.info('User is %s', user)

    const isVendor = await this.employeeService.isVendor(user)

    if (await bouncer.with('CarPolicy').denies('create', isVendor)) {
      return response.forbidden({
        message: 'You are not authorized to perform this action',
      })
    }
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
