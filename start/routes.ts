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
import router from '@adonisjs/core/services/router'

router.get('/health', async ({ response }: HttpContext) => {
  return response.noContent()
})

router
  .group(() => {
    router.post('/login', '#controllers/session_controller.login')
    router.post('/logout', '#controllers/session_controller.logout')
  })
  .prefix('auth')

router
  .group(() => {
    router.post('/', '#controllers/customers_controller.create')
  })
  .use(middleware.auth())
  .prefix('customer')
