import { type CheckAccountByEmailRepository } from '@/application/protocols/account/check-account-by-email-repository'
import { type Hasher } from '@/application/protocols/cryptography/hasher'
import { type AddAccountRepository } from '@/application/protocols/account/add-account-repository'
import { EmailInUseError } from '@/domain/errors/account/email-in-use-error'
import { type AddAccount } from '@/domain/usecases/account/add-account'

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository,
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  public async add(input: AddAccount.Input): Promise<string> {
    const emailInUse = await this.checkAccountByEmailRepository.check(input.email)
    if (emailInUse) {
      throw new EmailInUseError()
    }
    const hashedPassword = await this.hasher.hash(input.password)
    const accountId = await this.addAccountRepository.add({ ...input, password: hashedPassword })
    return accountId
  }
}
