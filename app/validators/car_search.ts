import vine from '@vinejs/vine'

export const searchCarValidator = vine.compile(
  vine.object({
    brand: vine.string().optional(),
    model: vine.string().optional(),
    mileage: vine.number().optional(),
    year: vine.number().optional(),
    price: vine.number().optional(),
  })
)
