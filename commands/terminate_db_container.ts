import { BaseCommand } from '@adonisjs/core/ace'
import { execSync } from 'node:child_process'

export default class TerminateDbContainer extends BaseCommand {
  static commandName = 'db:kill'
  static description = 'Terminate the database docker container'

  animatedLog = this.logger.await('Terminating the database container', {
    suffix: 'db:kill',
  })

  async run() {
    this.animatedLog.start()
    execSync('docker-compose down', { stdio: 'ignore' })
  }

  async completed() {
    if (this.error) {
      this.animatedLog.stop()
      this.logger.error('Database container failed to terminate')
      return true
    }

    this.animatedLog.update('Done.')
    this.animatedLog.stop()
    this.logger.success('Database container terminated')

    return true
  }
}
