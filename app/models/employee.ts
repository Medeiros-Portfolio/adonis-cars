import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Deal from '#models/deal'

export default class Employee extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare storeId: number

  @column()
  declare dealId: number

  @column()
  declare roleId: number

  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare gender: string

  @column.date()
  declare dateOfBirth: DateTime

  @hasMany(() => Deal)
  declare deal: HasMany<typeof Deal>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
