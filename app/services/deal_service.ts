import Deal from '#models/deal'
import CarService from '#services/car_service'
import EmployeeService from '#services/employee_service'
import { CreateDealDTO, SearchParams } from '#validators/create_deal'
import { inject } from '@adonisjs/core'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

@inject()
export default class DealService {
  constructor(
    protected carService: CarService,
    protected employeeService: EmployeeService
  ) {}

  async create(data: CreateDealDTO): Promise<Deal> {
    const { id: employeeId } = await this.employeeService.getByUserId(data.userId)

    await this.carService.sell(data.carId)

    const { userId, ...payload } = data

    return Deal.create({ ...payload, employeeId })
  }

  async query(searchParams: SearchParams): Promise<ModelPaginatorContract<Deal>> {
    if (!searchParams.page) {
      searchParams.page = 1
    }

    const { page, ...rawQuery } = searchParams
    const { from, to, ...query } = rawQuery

    let queryBuilder = Deal.query().where(query)

    if (from && to) {
      queryBuilder = queryBuilder.whereBetween('created_at', [from, to])
    }

    return queryBuilder.paginate(page, 10)
  }
}
