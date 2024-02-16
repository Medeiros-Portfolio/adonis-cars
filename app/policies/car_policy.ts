import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import { inject } from '@adonisjs/core'
import EmployeeService from '../services/employee_service.js'

@inject()
export default class CarPolicy extends BasePolicy {
  constructor(protected employeeService: EmployeeService) {
    super()
  }

  async create(email: string): Promise<AuthorizerResponse> {
    return this.employeeService.isVendor(email)
  }
}
