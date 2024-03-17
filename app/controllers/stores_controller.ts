import StoreService from '#services/store_service'
import { createStoreValidator } from '#validators/create_store'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class StoresController {
  constructor(protected storeService: StoreService) {}

  async create({ request, response }: HttpContext) {
    const data = request.only(['name', 'address'])

    const { name, address } = await createStoreValidator.validate(data)

    await this.storeService.createStore(name, address)

    return response.created()
  }
}
