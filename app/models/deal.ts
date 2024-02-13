import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import Vendor from './vendor.js'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import Car from './car.js'

export default class Deal extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @hasOne(() => Vendor)
  declare vendor_id: HasOne<typeof Vendor>

  @hasOne(() => Car)
  declare car_id: HasOne<typeof Car>

  @column()
  declare profit: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
