import Store from '#models/store'

export default class StoreService {
  async createStore(name: string, address: string) {
    await Store.create({
      name,
      address,
    })
  }
}
