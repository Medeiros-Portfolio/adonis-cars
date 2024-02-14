import { HttpContext } from '@adonisjs/core/http'
import { loginVendorValidator } from '../validators/add_vendor_password.js'
import Vendor from '../models/vendor.js'

export default class SessionsController {
  async loginStaff({ request, response, bouncer, auth }: HttpContext) {
    const { email, password } = await request.validateUsing(loginVendorValidator)

    const vendor = await Vendor.verifyCredentials(email, password)

    if (!vendor) {
      return bouncer.deny('Invalid credentials')
    }

    await auth.use('staff').login(vendor)

    return response.status(204)
  }
}
