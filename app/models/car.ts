import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import Deal from '#models/deal'
import type { HasOne } from '@adonisjs/lucid/types/relations'

export default class Car extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare storeId: number

  @column()
  declare dealId: number

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

  @hasOne(() => Deal)
  declare deal: HasOne<typeof Deal>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
