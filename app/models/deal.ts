import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import Employee from '#models/employee'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import Customer from '#models/customer'
import Car from '#models/car'

export default class Deal extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @hasOne(() => Employee)
  declare employee: HasOne<typeof Employee>

  @hasOne(() => Customer)
  declare customer: HasOne<typeof Customer>

  @hasOne(() => Car)
  declare car: HasOne<typeof Car>

  @column()
  declare pricePaid: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
