// import type { HttpContext } from '@adonisjs/core/http'

import { createCustomerAbility } from '#abilities/main'
import CustomerService from '#services/customer_service'
import { createCustomer } from '#validators/create_customer'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class CustomersController {
  constructor(protected service: CustomerService) {}

  async create({ request, response, bouncer }: HttpContext) {
    if (await bouncer.denies(createCustomerAbility)) {
      return response.unauthorized({ message: 'You are not allowed to create a customer' })
    }

    const body = request.body()
    const { firstName, lastName } = await createCustomer.validate(body)

    const customer = await this.service.createCustomer({ firstName, lastName })

    return response.created(customer)
  }
}
