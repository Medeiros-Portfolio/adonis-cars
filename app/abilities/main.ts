/*
|--------------------------------------------------------------------------
| Bouncer abilities
|--------------------------------------------------------------------------
|
| You may export multiple abilities from this file and pre-register them
| when creating the Bouncer instance.
|
| Pre-registered policies and abilities can be referenced as a string by their
| name. Also they are must if want to perform authorization inside Edge
| templates.
|
*/

import Employee from '#models/employee'
import Role from '#models/role'
import User from '#models/user'
import { Bouncer } from '@adonisjs/bouncer'

/**
 * Delete the following ability to start from
 * scratch
 */
export const createCustomerAbility = Bouncer.ability(async (user: User) => {
  const ALLOWED_ROLES = ['vendor', 'manager']

  const employee = await Employee.findBy('user_id', user.id)

  if (!employee) return false

  const role = await Role.findOrFail(employee.roleId)

  if (ALLOWED_ROLES.includes(role.title)) return true

  return false
})

export const createEmployeeAbility = Bouncer.ability(async (user: User) => {
  const ALLOWED_ROLES = ['manager']

  const employee = await Employee.findBy('user_id', user.id)

  if (!employee) return false

  const role = await Role.findOrFail(employee.roleId)

  if (ALLOWED_ROLES.includes(role.title)) return true

  return false
})

export const searchDealAbility = Bouncer.ability(async (user: User) => {
  const ALLOWED_ROLES = ['manager', 'accountant']

  const employee = await Employee.findBy('user_id', user.id)

  if (!employee) return false

  const role = await Role.findOrFail(employee.roleId)

  if (ALLOWED_ROLES.includes(role.title)) return true

  return false
})

export const createCarAbility = createCustomerAbility

export const createDealAbility = createCustomerAbility
