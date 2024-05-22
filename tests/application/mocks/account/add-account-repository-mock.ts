import { faker } from '@faker-js/faker'

import { type AddAccountRepository } from '@/application/protocols/account/add-account-repository'

export class AddAccountRepositorySpy implements AddAccountRepository {
  public input: AddAccountRepository.Input
  public output: string = faker.database.mongodbObjectId()

  public async add(input: AddAccountRepository.Input): Promise<string> {
    this.input = input
    return this.output
  }
}
