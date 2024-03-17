import vine from '@vinejs/vine'

export const createCustomer = vine.compile(
  vine.object({
    firstName: vine.string().minLength(2).maxLength(50),
    lastName: vine.string().minLength(2).maxLength(50),
  })
)
