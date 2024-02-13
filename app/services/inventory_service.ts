import Car from '../models/car.js'

export default class InventoryService {
  async addCar(car: Partial<Car>) {
    await Car.create(car)
  }
}
