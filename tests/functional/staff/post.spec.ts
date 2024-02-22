import EmployeeService from '#services/employee_service'
import app from '@adonisjs/core/services/app'
import { faker } from '@faker-js/faker'
import { test } from '@japa/runner'

test.group('POST /', (group) => {
  let employeeService: EmployeeService

  group.setup(async () => {
    employeeService = await app.container.make(EmployeeService)
  })

  test('should return 201 and create a new vendor', async ({ assert, client }) => {
    const response = await client.post('/staff').json({
      email: faker.internet.email(),
      name: faker.person.fullName(),
    })

    assert.equal(response.status(), 201)
  })

  test('should signup a vendor', async ({ assert, client }) => {
    const email = faker.internet.email()
    await employeeService.create({
      email,
      name: faker.person.fullName(),
    })

    const response = await client.post('/staff/signup').json({
      email,
      password: 'password',
    })

    assert.equal(response.status(), 201)
  })
})
