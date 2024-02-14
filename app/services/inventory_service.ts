import { ResolvedPromiseType } from '../../types/index.js'
import Car from '../models/car.js'
import { searchCarValidator } from '../validators/car_search.js'

export default class InventoryService {
  async addCar(car: Omit<Car, 'createdAt' | 'updatedAt' | 'id'>) {
    await Car.create(car)
  }

  async getAvailableCars(page: number = 1) {
    return Car.query().whereNull('buyer_id').paginate(page, 10)
  }

  async find(query: ResolvedPromiseType<typeof searchCarValidator.validate>, page: number = 1) {
    return Car.query().where(query).paginate(page, 10)
  }
}
