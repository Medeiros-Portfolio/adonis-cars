// import type { HttpContext } from '@adonisjs/core/http'

import CustomerService from '#services/customer_service'
import { createCustomer } from '#validators/customer'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class CustomersController {
  constructor(protected service: CustomerService) {}

  async create({ request, response }: HttpContext) {
    const body = request.body()
    const { firstName, lastName } = await createCustomer.validate(body)

    const customer = await this.service.createCustomer({ firstName, lastName })

    return response.created(customer)
  }
}
