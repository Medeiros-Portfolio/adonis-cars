import { ResolvedPromiseType } from '../../types/index.js'
import Vendor from '../models/vendor.js'
import { createVendorValidator } from '../validators/create_vendor.js'

export default class EmployeeService {
  async create(employee: ResolvedPromiseType<typeof createVendorValidator.validate>) {
    await Vendor.create(employee)
  }
}
