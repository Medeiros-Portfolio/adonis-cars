import vine from '@vinejs/vine'

export type ResetPasswordDTO = {
  email: string
  encryptedMessage: string
  newPassword: string
}

export const resetPasswordValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    encryptedMessage: vine.string(),
    newPassword: vine.string(),
  })
)
