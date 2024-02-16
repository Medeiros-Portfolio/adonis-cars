import { vendors } from '#tests/mock/vendor.example'
import { createVendorValidator } from '#validators/create_vendor'
import { test } from '@japa/runner'

test.group('Validators create vendor', () => {
  test('should return a valid vendor DTO', async ({ assert }) => {
    const validVendorDTO = vendors.first

    const result = await createVendorValidator.validate(validVendorDTO)

    assert.deepEqual(result, validVendorDTO)
  })

  test('should throw an error if the vendor DTO is incomplete', async ({ assert }) => {
    const { name, ...partialVendorDTO } = vendors.second

    assert.rejects(async () => await createVendorValidator.validate(partialVendorDTO))
  })

  test('should throw an error if the vendor DTO is invalid', async ({ assert }) => {
    const invalidVendorDTO = vendors.invalid

    assert.rejects(async () => await createVendorValidator.validate(invalidVendorDTO))
  })
})
