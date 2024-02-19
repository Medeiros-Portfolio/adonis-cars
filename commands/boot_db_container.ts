import { BaseCommand } from '@adonisjs/core/ace'
import { execSync } from 'node:child_process'

export default class BootDbContainer extends BaseCommand {
  static commandName = 'db:boot'
  static description = 'Start the database docker container for testing purposes'

  animatedLog = this.logger.await('Starting the database container', {
    suffix: 'db:boot',
  })

  async run() {
    this.animatedLog.start()

    execSync('docker-compose up -d db', { stdio: 'ignore' })

    this.animatedLog.update('Just one more second...')

    await new Promise((resolve) => setTimeout(resolve, 3000))
  }

  async completed() {
    if (this.error) {
      this.animatedLog.stop()
      this.logger.error('Database container failed to start')
      return true
    }

    this.animatedLog.update('Done.')
    this.animatedLog.stop()
    this.logger.success('Database container started')

    return true
  }
}
