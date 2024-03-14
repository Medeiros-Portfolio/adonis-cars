/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import router from '@adonisjs/core/services/router'

router
  .get('/info', async ({ response }: HttpContext) => {
    return response.json({
      environment: app.getEnvironment(),
      state: app.getState(),
      info: app.info,
    })
  })
  .use(
    middleware.auth({
      guards: ['admin'],
    })
  )

router
  .group(() => {
    router.post('/login', '#controllers/session_controller.login')
    router.post('/logout', '#controllers/session_controller.logout')
  })
  .prefix('auth')
