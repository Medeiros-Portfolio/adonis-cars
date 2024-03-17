import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { rmSync } from 'node:fs'

export default class Rmsqlite extends BaseCommand {
  static commandName = 'rmsqlite'
  static description = 'Erase the sqlite database used in development'

  static options: CommandOptions = {}

  async run() {
    this.logger.info('Removing sqlite database')

    const sqliteDatabasePath = this.app.tmpPath('db.sqlite3')

    rmSync(sqliteDatabasePath, { force: true })
  }

  async completed() {
    if (this.error) {
      this.logger.error('Error removing sqlite database')
      this.logger.error(this.error.message)

      return true
    }

    this.logger.success('Sqlite database removed')
  }
}
