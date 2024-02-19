import { vendors } from '#tests/mock/vendor.example'
import { test } from '@japa/runner'

test.group('POST /login', () => {
  test('should return 204 and set cookies', async ({ assert, client }) => {
    const response = await client.post('/auth/login').json({
      email: vendors.first.email,
      password: 'password',
    })

    assert.equal(response.status(), 204)
    assert.exists(response.headers()['set-cookie'])
  })

  test('should return 400 when invalid credentials', async ({ assert, client }) => {
    const response = await client
      .post('/auth/login')
      .json({
        email: vendors.first.email,
        password: 'notValid',
      })
      .send()

    assert.equal(response.status(), 400)
  })
})
