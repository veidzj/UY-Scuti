import { type AddAccount } from '@/domain/usecases/account/add-account'
import { AddAccountController } from '@/presentation/controllers/account/add-account-controller'

describe('AddAccountController', () => {
  test('Should call AddAccount with correct values', async() => {
    class AddAccountSpy implements AddAccount {
      public input: AddAccount.Input

      public async add(input: AddAccount.Input): Promise<void> {
        this.input = input
      }
    }
    const addAccountSpy = new AddAccountSpy()
    const sut = new AddAccountController(addAccountSpy)
    await sut.handle({ name: '' })
    expect(addAccountSpy.input).toEqual({ name: '' })
  })
})
