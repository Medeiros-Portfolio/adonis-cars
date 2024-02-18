import { cars } from '#tests/mock/car.example'
import { vendors } from '#tests/mock/vendor.example'
import { test } from '@japa/runner'

test.group('POST /', () => {
  test('should return status code 201', async ({ assert, client }) => {
    const body = cars.first
    const response = await client
      .post('/cars')
      .withSession({ auth_staff: vendors.first.email })
      .json(body)
      .send()

    assert.equal(response.status(), 201)
  })

  test('should return status 403', async ({ assert, client }) => {
    const body = cars.first
    const response = await client.post('/cars').json(body).send()

    assert.equal(response.status(), 401)
  })
})
