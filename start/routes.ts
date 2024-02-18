/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router.get('/_info', async () => {
  return {
    status: "I'm alive!",
  }
})

router
  .group(() => {
    router.post('/', '#controllers/cars_controller.create').use(middleware.auth())
    router.get('/', '#controllers/cars_controller.getAvailable')
    router.get('/search', '#controllers/cars_controller.search')
  })
  .prefix('cars')

router
  .group(() => {
    router.post('/', '#controllers/vendors_controller.create')
    router.post('/signup', '#controllers/vendors_controller.addPassword')
  })
  .prefix('staff')

router
  .group(() => {
    router.post('/login', '#controllers/sessions_controller.loginStaff')
  })
  .prefix('auth')
