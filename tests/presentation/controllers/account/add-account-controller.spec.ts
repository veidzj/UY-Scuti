import { AddAccountController } from '@/presentation/controllers/account/add-account-controller'
import { AddAccountSpy } from '@/tests/domain/mocks/add-account-mock'

interface Sut {
  sut: AddAccountController
  addAccountSpy: AddAccountSpy
}

const makeSut = (): Sut => {
  const addAccountSpy = new AddAccountSpy()
  const sut = new AddAccountController(addAccountSpy)
  return {
    sut,
    addAccountSpy
  }
}

const mockInput = (): AddAccountController.Input => ({
  username: 'any_username'
})

describe('AddAccountController', () => {
  test('Should call AddAccount with correct values', async() => {
    const { sut, addAccountSpy } = makeSut()
    const input = mockInput()
    await sut.handle(input)
    expect(addAccountSpy.input).toEqual(input)
  })
})
