import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Car extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare storeId: number

  @column()
  declare make: string

  @column()
  declare model: string

  @column()
  declare year: number

  @column()
  declare licensePlate: string

  @column()
  declare color: string

  @column()
  declare storePrice: number

  @column()
  declare sellPrice: number

  @column()
  declare sold: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
