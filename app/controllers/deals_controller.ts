import { createDealAbility, searchDealAbility } from '#abilities/main'
import DealService from '#services/deal_service'
import { SearchParams, createDealValidator } from '#validators/create_deal'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class DealsController {
  constructor(protected service: DealService) {}

  async create({ request, response, bouncer, auth }: HttpContext) {
    if (await bouncer.denies(createDealAbility)) {
      return response.unauthorized()
    }

    const user = auth.getUserOrFail()

    const payload = await createDealValidator.validate({ ...request.body(), userId: user.id })

    const deal = await this.service.create(payload)

    return response.created(deal)
  }

  async search({ request, response, bouncer }: HttpContext) {
    if (await bouncer.denies(searchDealAbility)) {
      return response.unauthorized()
    }

    const searchParams = request.qs() as SearchParams

    const deals = await this.service.query(searchParams)

    return response.ok(deals)
  }
}
