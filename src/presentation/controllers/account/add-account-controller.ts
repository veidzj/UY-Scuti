import { type AddAccount } from '@/domain/usecases/account/add-account'

export class AddAccountController {
  constructor(private readonly addAccount: AddAccount) {}

  public async handle(input: any): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await this.addAccount.add(input)
  }
}
