import { test } from '@japa/runner'

test.group('GET /', () => {
  test('should return cars with no buyer property', async ({ assert, client }) => {
    const response = await client.get('/cars').send()
    assert.equal(response.status(), 200)

    const { data } = response.body()
    assert.isArray(data)

    for (const car of data) {
      assert.notProperty(car, 'buyer')
    }
  })

  test('should return cars matching the search query', async ({ assert, client }) => {
    const response = await client.get('/cars/search').qs({ brand: 'Toyota' }).send()
    assert.equal(response.status(), 200)

    const { data } = response.body()
    assert.isArray(data)
    for (const car of data) {
      assert.equal(car.brand, 'Toyota')
    }
  })
})
