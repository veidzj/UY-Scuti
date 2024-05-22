import { type CheckAccountByEmailRepository } from '@/application/protocols/account/check-account-by-email-repository'
import { type AddAccount } from '@/domain/usecases/account/add-account'

export class DbAddAccount implements AddAccount {
  constructor(private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository) {}

  public async add(input: AddAccount.Input): Promise<string> {
    await this.checkAccountByEmailRepository.check(input.email)
    return ''
  }
}
