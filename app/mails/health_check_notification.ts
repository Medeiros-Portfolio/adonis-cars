import { BaseMail } from '@adonisjs/mail'

export default class HealthCheckNotification extends BaseMail {
  subject = 'Health check'

  /**
   * The "prepare" method is called automatically when
   * the email is sent or queued.
   */
  prepare() {
    this.message
      .to('rafaelmedrib@gmail.com')
      .htmlView('emails/health_check_email_html', { variable: 'value' })
  }
}
