import { test } from '@japa/runner'
import { addVendorPasswordValidator } from '#validators/add_vendor_password'

test.group('Validators add vendor password', () => {
  test('should return a valid password', async ({ assert }) => {
    const validPassword = '12345678'

    assert.doesNotReject(
      async () =>
        await addVendorPasswordValidator.validate({
          password: validPassword,
          email: 'email@email.com',
        })
    )
  })

  test('should throw an error if the password is invalid', async ({ assert }) => {
    const invalidPassword = '123'

    assert.rejects(
      async () =>
        await addVendorPasswordValidator.validate({
          password: invalidPassword,
          email: 'email@email.com',
        })
    )
  })

  test('should throw an error if the email is invalid', async ({ assert }) => {
    const invalidEmail = 'email'

    assert.rejects(
      async () =>
        await addVendorPasswordValidator.validate({
          password: '12345678',
          email: invalidEmail,
        })
    )
  })
})
