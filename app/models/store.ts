import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Car from '#models/car'
import Employee from '#models/employee'

export default class Store extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare address: string

  @hasMany(() => Car)
  declare cars: HasMany<typeof Car>

  @hasMany(() => Employee)
  declare employees: HasMany<typeof Employee>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
