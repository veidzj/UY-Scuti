import { EmailInUseError } from '@/domain/errors/account/email-in-use-error'
import { AddAccountController } from '@/presentation/controllers/account/add-account-controller'
import { AddAccountSpy } from '@/tests/domain/mocks/add-account-mock'
import { ValidationSpy } from '@/tests/presentation/mocks/validation-mock'
import { ValidationError } from '@/validation/errors/validation-error'

interface Sut {
  sut: AddAccountController
  addAccountSpy: AddAccountSpy
  validationSpy: ValidationSpy
}

const makeSut = (): Sut => {
  const validationSpy = new ValidationSpy()
  const addAccountSpy = new AddAccountSpy()
  const sut = new AddAccountController(validationSpy, addAccountSpy)
  return {
    sut,
    validationSpy,
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

  test('Should return status 201 with accountId on success', async() => {
    const { sut, addAccountSpy } = makeSut()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual({
      statusCode: 201,
      body: {
        accountId: addAccountSpy.output
      }
    })
  })

  test('Should return status 409 if AddAccount throws EmailInUseError', async() => {
    const { sut, addAccountSpy } = makeSut()
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(new EmailInUseError())
    const response = await sut.handle(mockRequest())
    expect(response).toEqual({
      statusCode: 409,
      body: 'Email is already in use'
    })
  })

  test('Should return status 500 if AddAccount throws', async() => {
    const { sut, addAccountSpy } = makeSut()
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(new Error())
    const response = await sut.handle(mockRequest())
    expect(response).toEqual({
      statusCode: 500,
      body: 'The server has encountered an unexpected error'
    })
  })

  test('Should call Validation with correct values', async() => {
    const { sut, addAccountSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addAccountSpy.input).toEqual(request)
  })

  test('Should return status 400 if Validation throws ValidationError', async() => {
    const { sut, validationSpy } = makeSut()
    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => { throw new ValidationError('error_message') })
    const response = await sut.handle(mockRequest())
    expect(response).toEqual({
      statusCode: 400,
      body: new ValidationError('error_message')
    })
  })

  test('Should return status 500 if Validation throws', async() => {
    const { sut, validationSpy } = makeSut()
    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => { throw new Error() })
    const response = await sut.handle(mockRequest())
    expect(response).toEqual({
      statusCode: 500,
      body: 'The server has encountered an unexpected error'
    })
  })
})
