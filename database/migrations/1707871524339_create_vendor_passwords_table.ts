import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'vendors'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('password').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}