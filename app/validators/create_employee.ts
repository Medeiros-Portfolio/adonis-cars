import vine from '@vinejs/vine'

const GENDERS = ['male', 'female', 'other']

type Gender = (typeof GENDERS)[number]

export interface CreateEmployeeDTO {
  email: string
  password: string
  storeId: number
  title: string
  firstName: string
  lastName: string
  gender: Gender
  dateOfBirth: Date
}

export const createEmployee = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string().ascii().minLength(8).maxLength(15),
    storeId: vine.number().withoutDecimals().min(1),
    title: vine.string().alpha(),
    firstName: vine.string().alpha().minLength(2).maxLength(50),
    lastName: vine.string().alpha().minLength(2).maxLength(50),
    gender: vine.enum(GENDERS),
    dateOfBirth: vine.date({
      formats: ['YYYY-MM-DD'],
    }),
  })
)
