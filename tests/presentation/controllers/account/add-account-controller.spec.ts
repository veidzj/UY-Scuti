import { faker } from '@faker-js/faker'

import { ValidationSpy } from '@/tests/presentation/mocks/validation-mock'
import { AddAccountSpy } from '@/tests/domain/mocks/account/add-account-mock'
import { AddAccountController } from '@/presentation/controllers/account/add-account-controller'
import { ValidationError } from '@/validation/errors/validation-error'
import { EmailInUseError } from '@/domain/errors/account/email-in-use-error'

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
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

describe('AddAccountController', () => {
  describe('Validation', () => {
    test('Should call Validation with correct values', async() => {
      const { sut, addAccountSpy } = makeSut()
      const request = mockRequest()
      await sut.handle(request)
      expect(addAccountSpy.input).toEqual(request)
    })

    test('Should return status 400 if Validation throws ValidationError', async() => {
      const { sut, validationSpy } = makeSut()
      const errorMessage = faker.word.words()
      jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => { throw new ValidationError(errorMessage) })
      const response = await sut.handle(mockRequest())
      expect(response).toEqual({
        statusCode: 400,
        body: new ValidationError(errorMessage)
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

  describe('AddAccount', () => {
    test('Should call AddAccount with correct values', async() => {
      const { sut, addAccountSpy } = makeSut()
      const request = mockRequest()
      await sut.handle(request)
      expect(addAccountSpy.input).toEqual(request)
    })

    test('Should return status 409 if AddAccount throws EmailInUseError', async() => {
      const { sut, addAccountSpy } = makeSut()
      jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(new EmailInUseError())
      const response = await sut.handle(mockRequest())
      expect(response).toEqual({
        statusCode: 409,
        body: new EmailInUseError()
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
  })
})
