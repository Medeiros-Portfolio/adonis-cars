import vine from '@vinejs/vine'

/**
 * Validator to validate the payload when creating
 * a new car.
 */
export const createCarValidator = vine.compile(
  vine.object({
    brand: vine.string(),
    model: vine.string(),
    year: vine.number(),
    price: vine.number(),
    mileage: vine.number(),
  })
)

/**
 * Validator to validate the payload when updating
 * an existing car.
 */
export const updateCarValidator = vine.compile(vine.object({}))
