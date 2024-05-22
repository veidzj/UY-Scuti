import { type CheckAccountByEmailRepository } from '@/application/protocols/account/check-account-by-email-repository'
import { EmailInUseError } from '@/domain/errors/account/email-in-use-error'
import { type AddAccount } from '@/domain/usecases/account/add-account'

export class DbAddAccount implements AddAccount {
  constructor(private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository) {}

  public async add(input: AddAccount.Input): Promise<string> {
    const emailInUse = await this.checkAccountByEmailRepository.check(input.email)
    if (emailInUse) {
      throw new EmailInUseError()
    }
    return ''
  }
}
