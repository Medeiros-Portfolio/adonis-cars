import { ResolvedPromiseType } from '../../types/index.js'
import Car from '../models/car.js'
import { createCarValidator } from '../validators/create_car.js'

export default class InventoryService {
  async addCar(car: ResolvedPromiseType<typeof createCarValidator.validate>) {
    await Car.create(car)
  }

  async getAvailableCars(page: number = 1) {
    return Car.query().whereNull('buyer_id').paginate(page, 10)
  }

  async find(query: Partial<Car>, page: number = 1) {
    return Car.query().where(query).paginate(page, 10)
  }
}
