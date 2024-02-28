import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import Role from '#models/role'
import type { HasOne } from '@adonisjs/lucid/types/relations'

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
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare gender: string

  @column.date()
  declare dateOfBirth: DateTime

  @hasOne(() => Role)
  declare role: HasOne<typeof Role>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
