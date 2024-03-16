import Employee from '#models/employee'
import Role from '#models/role'
import User from '#models/user'
import { test } from '@japa/runner'

test.group('Employee create', (group) => {
  const data = {
    email: 'fake@fake.fake',
    password: 'password',
    storeId: 1,
    title: 'vendor',
    firstName: 'Rick',
    lastName: 'Sanchez',
    gender: 'male',
    dateOfBirth: '1989-10-05',
  }

  let managerUser: User
  let vendorUser: User

  group.setup(async () => {
    const { id: managerRoleId } = await Role.findByOrFail('title', 'manager')
    const { userId: managerUserId } = await Employee.findByOrFail('role_id', managerRoleId)
    managerUser = await User.findOrFail(managerUserId)

    const { id: vendorRoleId } = await Role.findByOrFail('title', 'vendor')
    const { userId: vendorUserId } = await Employee.findByOrFail('role_id', vendorRoleId)
    vendorUser = await User.findOrFail(vendorUserId)
  })

  test('should create a new employee', async ({ client }) => {
    const response = await client.post('/employee').loginAs(managerUser).json(data).send()

    response.assertStatus(201)
  })

  test('should not create if not logged in', async ({ client }) => {
    const response = await client.post('/employee').json(data).send()

    response.assertStatus(401)
  })

  test('should not create if not a manager', async ({ client }) => {
    const response = await client.post('/employee').loginAs(vendorUser).json(data).send()

    response.assertStatus(401)
  })

  test('should not create if data is invalid', async ({ client }) => {
    const response = await client
      .post('/employee')
      .loginAs(managerUser)
      .json({ ...data, email: 'invalid' })
      .send()

    response.assertStatus(422)
  })
})
