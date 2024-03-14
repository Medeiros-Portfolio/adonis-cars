import Role from '#models/role'

export default class RoleService {
  async createRole(title: string, baseSalary: number) {
    await Role.create({
      title,
      baseSalary,
    })
  }
}
