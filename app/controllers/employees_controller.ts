import { createEmployeeAbility } from '#abilities/main'
import EmployeeService from '#services/employee_service'
import { createEmployee } from '#validators/create_employee'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class EmployeesController {
  constructor(protected employeeService: EmployeeService) {}

  async create({ request, response, bouncer }: HttpContext) {
    if (await bouncer.denies(createEmployeeAbility)) {
      return response.unauthorized({ message: 'You are not allowed to register an employee' })
    }

    const payload = await request.validateUsing(createEmployee)

    const employee = await this.employeeService.create(payload)

    return response.created(employee)
  }
}
