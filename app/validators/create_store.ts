import vine from '@vinejs/vine'

export type CreateStoreDTO = {
  name: string
  address: string
}

export const createStoreValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3).maxLength(30),
    address: vine.string().minLength(5).maxLength(100),
  })
)
