import { cars } from '#tests/mock/car.example'
import { test } from '@japa/runner'

test.group('Routes cars', () => {
  test('POST /', async ({ assert, client }) => {
    const body = cars.first
    const response = await client.post('/cars').json(body).send()

    assert.equal(response.status(), 201)
  })

  test('GET /', async ({ assert, client }) => {
    const response = await client.get('/cars').send()
    assert.equal(response.status(), 200)

    const { data } = response.body()
    assert.isArray(data)

    for (const car of data) {
      assert.notProperty(car, 'buyer')
    }
  })

  test('GET /search', async ({ assert, client }) => {
    const response = await client.get('/cars/search').qs({ brand: 'Toyota' }).send()
    assert.equal(response.status(), 200)

    const { data } = response.body()
    assert.isArray(data)
    for (const car of data) {
      assert.equal(car.brand, 'Toyota')
    }
  })
})
