import { test } from '@japa/runner'
import app from '@adonisjs/core/services/app'
import EmployeeService from '#services/employee_service'
import { vendors } from '#mock/vendor.example'

test.group('Employee service', (group) => {
  let employeeService: EmployeeService

  group.setup(async () => {
    employeeService = await app.container.make(EmployeeService)
  })

  test('should create a new vendor', async ({ assert }) => {
    const input = vendors.third

    assert.doesNotReject(async () => {
      await employeeService.create(input)
    })
  })

  test('should find a vendor by email', async ({ assert }) => {
    assert.plan(2)
    const email = vendors.first.email

    const vendor = await employeeService.findByEmail(email)

    assert.exists(vendor)
    assert.equal(vendor?.email, email)
  })

  test('should check if it is a vendor', async ({ assert }) => {
    assert.plan(2)
    const email = vendors.first.email

    const isVendor = await employeeService.isVendor(email)
    const isNotVendor = await employeeService.isVendor('notavendor@fakeemail.not')

    assert.isTrue(isVendor)
    assert.isFalse(isNotVendor)
  })

  test('should add a password to a vendor', async ({ assert }) => {
    const vendor = {
      name: 'Test Vendor',
      email: 'test@email.notreal',
    }

    await employeeService.create(vendor)

    assert.plan(1)
    const password = 'password'

    assert.doesNotReject(async () => {
      await employeeService.addPassword(vendor.email, password)
    })
  })
})
