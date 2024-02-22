import { AddCarDTO } from '#types/index'
import Car from '../models/car.js'

export default class InventoryService {
  async addCar(car: AddCarDTO) {
    await Car.create(car)
  }

  async getAvailableCars(page: number = 1) {
    return Car.query().whereNull('buyer_id').paginate(page, 10)
  }

  async find(query: Partial<Car>, page: number = 1) {
    return Car.query().where(query).paginate(page, 10)
  }
}
