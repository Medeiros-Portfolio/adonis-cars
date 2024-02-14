import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import EmployeeService from '../services/employee_service.js'
import { createVendorValidator } from '../validators/create_vendor.js'

@inject()
export default class VendorsController {
  constructor(protected employeeService: EmployeeService) {}

  async create({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createVendorValidator)

    await this.employeeService.create(payload)

    return response.created({
      message: 'Vendor added to the system',
    })
  }
}
