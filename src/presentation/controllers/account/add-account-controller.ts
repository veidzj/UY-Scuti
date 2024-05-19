import { type AddAccount } from '@/domain/usecases/account/add-account'

export class AddAccountController {
  constructor(private readonly addAccount: AddAccount) {}

  public async handle(input: AddAccountController.Input): Promise<void> {
    await this.addAccount.add(input)
  }
}

export namespace AddAccountController {
  export interface Input {
    username: string
  }
}
