import { test } from '@japa/runner'

test.group('Routes info', () => {
  test('GET /', async ({ assert, client }) => {
    const response = await client.get('/_info').send()

    assert.equal(response.status(), 200)
  })
})
