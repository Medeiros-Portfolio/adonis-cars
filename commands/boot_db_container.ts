import { BaseCommand } from '@adonisjs/core/ace'
import { execSync } from 'node:child_process'

export default class BootDbContainer extends BaseCommand {
  static commandName = 'boot:db-container'
  static description = 'Start the database container for testing purposes'

  async run() {
    this.logger.info('Starting the database container')
    execSync('docker-compose up -d db', { stdio: 'inherit' })
  }

  async completed() {
    if (this.error) {
      this.logger.error('Database container failed to start')
      return true
    }

    this.logger.success('Database container started')

    return true
  }
}
