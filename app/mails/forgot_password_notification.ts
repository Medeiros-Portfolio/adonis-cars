import { BaseMail } from '@adonisjs/mail'

export default class ForgotPasswordNotification extends BaseMail {
  constructor(
    private email: string,
    private encryptedMessage: string,
    private expiry: string
  ) {
    super()
  }

  subject = 'AdonisCars - Reset Password'

  /**
   * The "prepare" method is called automatically when
   * the email is sent or queued.
   */
  prepare() {
    this.message.to(this.email).htmlView('emails/forgot_password_email_html', {
      encryptedMessage: this.encryptedMessage,
      expiry: this.expiry,
    })
  }
}
