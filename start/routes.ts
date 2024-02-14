/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    router.post('/', '#controllers/cars_controller.create')
    router.get('/', '#controllers/cars_controller.getAvailable')
    router.get('/search', '#controllers/cars_controller.search')
  })
  .prefix('cars')

router
  .group(() => {
    router.post('/', '#controllers/vendors_controller.create')
  })
  .prefix('staff')
