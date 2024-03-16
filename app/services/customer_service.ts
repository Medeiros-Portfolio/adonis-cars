import Customer from '#models/customer'

export default class CustomerService {
  async createCustomer({
    firstName,
    lastName,
  }: Pick<Customer, 'firstName' | 'lastName'>): Promise<Customer> {
    return Customer.create({
      firstName,
      lastName,
    })
  }
}
