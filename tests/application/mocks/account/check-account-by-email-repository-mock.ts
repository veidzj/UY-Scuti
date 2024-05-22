import { type CheckAccountByEmailRepository } from '@/application/protocols/account/check-account-by-email-repository'

export class CheckAccountByEmailRepositorySpy implements CheckAccountByEmailRepository {
  public email: string
  public output: boolean = false

  public async check(email: string): Promise<boolean> {
    this.email = email
    return this.output
  }
}
