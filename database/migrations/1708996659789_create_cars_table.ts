import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'cars'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('store_id').unsigned().references('id').inTable('stores').onDelete('CASCADE')
      table.string('make').notNullable()
      table.string('model').notNullable()
      table.integer('year').notNullable()
      table.string('license_plate').notNullable().unique()
      table.string('color').notNullable()
      table.decimal('store_price').notNullable()
      table.decimal('sell_price').notNullable()
      table.boolean('sold').defaultTo(false)

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
