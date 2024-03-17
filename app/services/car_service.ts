import Car from '#models/car'
import { CreateCarDTO, SearchParams } from '#validators/create_car'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

export default class CarService {
  async create({ make, model, year, licensePlate, color, storePrice, sellPrice }: CreateCarDTO) {
    return Car.create({ make, model, year, licensePlate, color, storePrice, sellPrice })
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

    car.sold = true

    await car.save()
  }
}
