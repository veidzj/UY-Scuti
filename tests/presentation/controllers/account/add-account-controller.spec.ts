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

const mockRequest = (): AddAccountController.Request => ({
  username: 'any_username'
})

describe('AddAccountController', () => {
  test('Should call AddAccount with correct values', async() => {
    const { sut, addAccountSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addAccountSpy.input).toEqual(request)
  })
})
