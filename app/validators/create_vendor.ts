import vine from '@vinejs/vine'

export const createVendorValidator = vine.compile(
  vine.object({
    name: vine.string(),
    email: vine.string().email(),
  })
)
