import redis from '@adonisjs/redis/services/main'
import User from '#models/user'
import stringHelpers from '@adonisjs/core/helpers/string'
import encryption from '@adonisjs/core/services/encryption'
import mail from '@adonisjs/mail/services/main'
import ForgotPasswordNotification from '#mails/forgot_password_notification'
import { MessageBuilder } from '@adonisjs/core/helpers'
import InvalidTokenException from '#exceptions/invalid_token_exception'
import { ResetPasswordDTO } from '#validators/reset_password'

export default class PasswordService {
  private messageBuilder: MessageBuilder

  constructor() {
    this.messageBuilder = new MessageBuilder()
  }
  async changePassword() {}

  async forgotPassword(email: string) {
    await User.findByOrFail('email', email)

    const token = stringHelpers.random(10)

    const ONE_HOUR = '1 hour'
    const PURPOSE = 'forgot_password'

    const encoded = this.messageBuilder.build(
      {
        token,
      },
      ONE_HOUR,
      PURPOSE
    )

    const { expiryDate } = JSON.parse(encoded)

    const redisKey = email
    const redisValue = token

    await redis.setex(redisKey, stringHelpers.seconds.parse(ONE_HOUR), redisValue)

    const encryptedMessage = encryption.encrypt(encoded)

    await mail.sendLater(new ForgotPasswordNotification(email, encryptedMessage, expiryDate))
  }

  async confirmForgotPassword({ email, encryptedMessage, newPassword }: ResetPasswordDTO) {
    const redisKey = email
    const token = await redis.get(redisKey)

    if (!token) throw new InvalidTokenException()

    const message = encryption.decrypt(encryptedMessage)

    const decoded = this.messageBuilder.verify(message, 'forgot_password') as { token: string }

    if (decoded.token !== token) throw new InvalidTokenException()

    const user = await User.findByOrFail('email', email)
    user.password = newPassword
    await user.save()
  }
}
