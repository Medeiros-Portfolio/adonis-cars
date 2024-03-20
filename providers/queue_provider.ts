import env from '#start/env'
import type { ApplicationService } from '@adonisjs/core/types'
import mail from '@adonisjs/mail/services/main'
import { Queue, Worker } from 'bullmq'

export default class QueueProvider {
  private _queue!: Queue

  private _worker!: Worker

  constructor(protected app: ApplicationService) {}

  /**
   * Register bindings to the container
   */
  register() {}

  /**
   * The container bindings have booted
   */
  async boot() {}

  /**
   * The application has been booted
   */
  async start() {}

  /**
   * The process has been started
   */
  async ready() {
    const emailsQueue = new Queue('emails', {
      connection: {
        host: env.get('REDIS_HOST'),
        port: env.get('REDIS_PORT'),
        password: env.get('REDIS_PASSWORD', ''),
      },
    })

    this._queue = emailsQueue

    mail.setMessenger((mailer) => {
      return {
        async queue(mailMessage, config) {
          await emailsQueue.add('send_email', {
            mailMessage,
            config,
            mailerName: mailer.name,
          })
        },
      }
    })

    this._worker = new Worker(
      'emails',
      async (job) => {
        if (job.name === 'send_email') {
          const { mailMessage, config, mailerName } = job.data

          await mail.use(mailerName).sendCompiled(mailMessage, config)
        }
      },
      {
        connection: {
          host: env.get('REDIS_HOST'),
          port: env.get('REDIS_PORT'),
          password: env.get('REDIS_PASSWORD', ''),
        },
      }
    )
  }

  /**
   * Preparing to shutdown the app
   */
  async shutdown() {
    await this._queue.close()
    await this._worker.close()
  }
}
