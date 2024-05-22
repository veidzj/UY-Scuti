import { type AddAccount } from '@/domain/usecases/account/add-account'

export class AddAccountSpy implements AddAccount {
  public input: AddAccount.Input
  public output: string = 'any_account_id'

  public async add(input: AddAccount.Input): Promise<string> {
    this.input = input
    return this.output
  }
}
