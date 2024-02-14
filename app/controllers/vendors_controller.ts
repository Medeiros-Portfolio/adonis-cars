import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import EmployeeService from '../services/employee_service.js'
import { createVendorValidator } from '../validators/create_vendor.js'
import EmailAlreadyExistsException from '../exceptions/email_already_exists_exception.js'

@inject()
export default class VendorsController {
  constructor(protected employeeService: EmployeeService) {}

  async create({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createVendorValidator)

    const vendorExists = await this.employeeService.findByEmail(payload.email)

    if (vendorExists) {
      throw new EmailAlreadyExistsException('Email already exists in the system')
    }

    await this.employeeService.create(payload)

    return response.created({
      message: 'Vendor added to the system',
    })
  }
}
