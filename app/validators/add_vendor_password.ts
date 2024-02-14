import vine from '@vinejs/vine'

export const addVendorPasswordValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string().minLength(8).ascii(),
  })
)

export const loginVendorValidator = addVendorPasswordValidator
