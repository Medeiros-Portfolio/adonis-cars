import { inject } from '@adonisjs/core'
import UserService from '#services/user_service'
import Employee from '#models/employee'
import Store from '#models/store'
import Role from '#models/role'
import { DateTime } from 'luxon'
import { CreateEmployeeDTO } from '#validators/create_employee'

@inject()
export default class EmployeeService {
  constructor(protected userService: UserService) {}

  async create({
    email,
    password,
    storeId,
    title,
    firstName,
    lastName,
    gender,
    dateOfBirth,
  }: CreateEmployeeDTO): Promise<Employee> {
    const user = await this.userService.createUser(email, password)
    const store = await Store.findOrFail(storeId)
    const role = await Role.findByOrFail('title', title)

    const employee = await user.related('employee').create({
      firstName,
      lastName,
      gender,
      dateOfBirth: DateTime.fromJSDate(dateOfBirth),
    })

    await store.related('employees').save(employee)

    await role.related('employees').save(employee)

    return employee
  }
}
