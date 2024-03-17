import { defineConfig } from '@adonisjs/auth'
import { InferAuthEvents, Authenticators } from '@adonisjs/auth/types'
import { sessionGuard, sessionUserProvider } from '@adonisjs/auth/session'
import { basicAuthGuard, basicAuthUserProvider } from '@adonisjs/auth/basic_auth'

const authConfig = defineConfig({
  default: 'staff',
  guards: {
    staff: sessionGuard({
      useRememberMeTokens: false,
      provider: sessionUserProvider({
        model: () => import('#models/user'),
      }),
    }),
    admin: basicAuthGuard({
      provider: basicAuthUserProvider({
        model: () => import('#models/admin'),
      }),
    }),
  },
})

export default authConfig

/**
 * Inferring types from the configured auth
 * guards.
 */
declare module '@adonisjs/auth/types' {
  interface Authenticators extends InferAuthenticators<typeof authConfig> {}
}
declare module '@adonisjs/core/types' {
  interface EventsList extends InferAuthEvents<Authenticators> {}
}
