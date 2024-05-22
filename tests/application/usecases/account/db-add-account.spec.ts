import { CheckAccountByEmailRepositorySpy } from '@/tests/application/mocks/account/check-account-by-email-repository-mock'
import { mockAddAccountInput } from '@/tests/domain/mocks/account/add-account-mock'
import { DbAddAccount } from '@/application/usecases/account/db-add-account'
import { EmailInUseError } from '@/domain/errors/account/email-in-use-error'

interface Sut {
  sut: DbAddAccount
  checkAccountByEmailRepositorySpy: CheckAccountByEmailRepositorySpy
}

const makeSut = (): Sut => {
  const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy()
  const sut = new DbAddAccount(checkAccountByEmailRepositorySpy)
  return {
    sut,
    checkAccountByEmailRepositorySpy
  }
}

describe('DbAddAccount', () => {
  test('Should call CheckAccountByEmailRepository with correct email', async() => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut()
    const addAccountInput = mockAddAccountInput()
    await sut.add(addAccountInput)
    expect(checkAccountByEmailRepositorySpy.email).toBe(addAccountInput.email)
  })

  test('Should throw if CheckAccountByEmailRepository throws', async() => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut()
    jest.spyOn(checkAccountByEmailRepositorySpy, 'check').mockRejectedValueOnce(new Error())
    const promise = sut.add(mockAddAccountInput())
    await expect(promise).rejects.toThrow()
  })

  test('Should throw EmailInUseError if CheckAccountByEmailRepository returns true', async() => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut()
    checkAccountByEmailRepositorySpy.output = true
    const promise = sut.add(mockAddAccountInput())
    await expect(promise).rejects.toThrow(new EmailInUseError())
  })

  test('Should not throw on success', async() => {
    const { sut } = makeSut()
    const promise = sut.add(mockAddAccountInput())
    await expect(promise).resolves.not.toThrow()
  })
})
