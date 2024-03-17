import CarAlreadySoldException from '#exceptions/car_already_sold_exception'
import Car from '#models/car'
import EmployeeService from '#services/employee_service'
import { CreateCarDTO, SearchParams } from '#validators/create_car'
import { inject } from '@adonisjs/core'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

@inject()
export default class CarService {
  constructor(protected employeeService: EmployeeService) {}

  async create(
    { make, model, year, licensePlate, color, storePrice, sellPrice }: CreateCarDTO,
    userId: number
  ) {
    const { storeId } = await this.employeeService.getByUserId(userId)

    return Car.create({ make, model, year, licensePlate, color, storePrice, sellPrice, storeId })
  }

  async getAvailable(page: number = 1): Promise<ModelPaginatorContract<Car>> {
    return Car.query().where('sold', false).paginate(page, 10)
  }

  async query(searchParams: SearchParams): Promise<ModelPaginatorContract<Car>> {
    if (!searchParams.page) {
      searchParams.page = 1
    }

    const { page, ...query } = searchParams

    return Car.query().where(query).paginate(page, 10)
  }

  async sell(carId: number): Promise<void> {
    const car = await Car.findOrFail(carId)

    if (car.sold) throw new CarAlreadySoldException()

    car.sold = true

    await car.save()
  }
}
