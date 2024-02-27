import vine from '@vinejs/vine'

export const createManagerValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string().minLength(8).ascii(),
  })
)
