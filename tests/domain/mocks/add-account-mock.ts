import { type AddAccount } from '@/domain/usecases/account/add-account'

export class AddAccountSpy implements AddAccount {
  public input: AddAccount.Input

  public async add(input: AddAccount.Input): Promise<void> {
    this.input = input
  }
}
