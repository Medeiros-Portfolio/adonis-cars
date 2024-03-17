import vine from '@vinejs/vine'

export type CreateDealDTO = {
  carId: number
  customerId: number
  userId: number
  pricePaid: number
}

export type SearchParams = Omit<CreateDealDTO, 'userId'> & {
  employeeId: number
  page: number
  from: string
  to: string
}

export const createDealValidator = vine.compile(
  vine.object({
    carId: vine.number(),
    customerId: vine.number(),
    userId: vine.number(),
    pricePaid: vine.number().decimal(2),
  })
)
