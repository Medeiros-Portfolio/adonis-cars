import { test } from '@japa/runner'
import { cars } from '#mock/car.example'
import { createCarValidator } from '#validators/create_car'

test.group('Validators create car', () => {
  test('should return a valid car DTO', async ({ assert }) => {
    const validCarDTO = cars.first

    const firstResult = await createCarValidator.validate(validCarDTO)

    assert.deepEqual(firstResult, validCarDTO)
  })

  test('shold throw an error if the car DTO is incomplete', async ({ assert }) => {
    const { brand, mileage, ...partialCarDTO } = cars.second

    assert.rejects(async () => await createCarValidator.validate(partialCarDTO))
  })

  test('should throw an error if the car DTO is invalid', async ({ assert }) => {
    const invalidCarDTO = cars.invalid

    assert.rejects(async () => await createCarValidator.validate(invalidCarDTO))
  })
})
