import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import Deal from '#models/deal'
import type { HasOne } from '@adonisjs/lucid/types/relations'

export default class Customer extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare dealId: number

  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @hasOne(() => Deal)
  declare deal: HasOne<typeof Deal>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
