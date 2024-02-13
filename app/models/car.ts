import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import Customer from './customer.js'
import type { HasOne } from '@adonisjs/lucid/types/relations'

export default class Car extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare brand: string

  @column()
  declare model: string

  @column()
  declare year: number

  @column()
  declare price: number

  @column()
  declare mileage: number

  @hasOne(() => Customer)
  declare buyer: HasOne<typeof Customer>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
