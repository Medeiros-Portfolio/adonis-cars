import { test } from '@japa/runner'
import { cars } from '#mock/car.example'
import { searchCarValidator } from '#validators/car_search'

test.group('Validators car search', () => {
  test('should return a valid car DTO', async ({ assert }) => {
    assert.plan(2)

    const validCarDTO = cars.first
    const { brand, mileage, ...partialCarDTO } = cars.second

    const firstResult = await searchCarValidator.validate(validCarDTO)
    const secondResult = await searchCarValidator.validate(partialCarDTO)

    assert.deepEqual(firstResult, validCarDTO)
    assert.deepEqual(secondResult, partialCarDTO)
  })

  test('should throw an error if the car DTO is invalid', async ({ assert }) => {
    const invalidCarDTO = cars.invalid

    assert.rejects(async () => await searchCarValidator.validate(invalidCarDTO))
  })
})
