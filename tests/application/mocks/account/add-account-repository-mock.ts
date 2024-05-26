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

export const mockAddAccountRepositoryInput = (): AddAccountRepository.Input => ({
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  birthdate: faker.date.birthdate().toString(),
  profileImage: faker.internet.url()
})
