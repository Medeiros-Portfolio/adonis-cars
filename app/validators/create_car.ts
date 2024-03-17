import vine from '@vinejs/vine'

export type CreateCarDTO = {
  make: string
  model: string
  year: number
  licensePlate: string
  color: string
  storePrice: number
  sellPrice: number
}

export type SearchParams = CreateCarDTO & {
  page: number
  available: boolean
}

export const createCarValidator = vine.compile(
  vine.object({
    make: vine.string(),
    model: vine.string(),
    year: vine.number(),
    licensePlate: vine.string(),
    color: vine.string(),
    storePrice: vine.number().decimal(2),
    sellPrice: vine.number().decimal(2),
  })
)
