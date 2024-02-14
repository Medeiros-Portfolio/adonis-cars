import { BaseCommand } from '@adonisjs/core/ace'
import { execSync } from 'node:child_process'

export default class TerminateDbContainer extends BaseCommand {
  static commandName = 'terminate:db-container'
  static description = 'Terminate the database container'

  async run() {
    this.logger.info('Terminating the database container')
    execSync('docker-compose down', { stdio: 'inherit' })
  }

  async completed() {
    if (this.error) {
      this.logger.error('Database container failed to terminate')
      return true
    }

    this.logger.success('Database container terminated')

    return true
  }
}
