import Manager from '#models/manager'
import { CreateManagerDTO } from '#types/index'

export default class ManagerService {
  async create(payload: CreateManagerDTO) {
    await Manager.create(payload)
  }
}
