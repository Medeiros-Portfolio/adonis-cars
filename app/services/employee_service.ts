import { CreateVendorDTO } from '#types/index'
import VendorNotFoundException from '../exceptions/vendor_not_found_exception.js'
import Vendor from '../models/vendor.js'

export default class EmployeeService {
  async create(employee: CreateVendorDTO) {
    await Vendor.create(employee)
  }

  async findByEmail(email: string) {
    return Vendor.findBy('email', email)
  }

  async isVendor(email: string) {
    try {
      await Vendor.findOrFail(email)
      return true
    } catch (error) {
      return false
    }
  }

  async addPassword(email: string, password: string) {
    const vendor = await Vendor.findBy('email', email)

    if (!vendor) {
      throw new VendorNotFoundException('Vendor not found')
    }

    vendor.password = password

    await vendor.save()
  }
}
