import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Deal extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare employeeId: number

  @column()
  declare customerId: number

  @column()
  declare carId: number

  @column()
  declare pricePaid: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
