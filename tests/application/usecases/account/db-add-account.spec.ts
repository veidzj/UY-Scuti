import { CheckAccountByEmailRepositorySpy } from '@/tests/application/mocks/account/check-account-by-email-repository-mock'
import { mockAddAccountInput } from '@/tests/domain/mocks/account/add-account-mock'
import { DbAddAccount } from '@/application/usecases/account/db-add-account'
import { EmailInUseError } from '@/domain/errors/account/email-in-use-error'
import { AddAccountRepositorySpy } from '@/tests/application/mocks/account/add-account-repository-mock'
import { HasherSpy } from '@/tests/application/mocks/cryptography/hasher-mock'

interface Sut {
  sut: DbAddAccount
  checkAccountByEmailRepositorySpy: CheckAccountByEmailRepositorySpy
  hasherSpy: HasherSpy
  addAccountRepositorySpy: AddAccountRepositorySpy
}

const makeSut = (): Sut => {
  const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy()
  const hasherSpy = new HasherSpy()
  const addAccountRepositorySpy = new AddAccountRepositorySpy()
  const sut = new DbAddAccount(checkAccountByEmailRepositorySpy, hasherSpy, addAccountRepositorySpy)
  return {
    sut,
    checkAccountByEmailRepositorySpy,
    hasherSpy,
    addAccountRepositorySpy
  }
}

describe('DbAddAccount', () => {
  describe('CheckAccountByEmailRepository', () => {
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
  })

  describe('Hasher', () => {
    test('Should call Hasher with correct password', async() => {
      const { sut, hasherSpy } = makeSut()
      const addAccountInput = mockAddAccountInput()
      await sut.add(addAccountInput)
      expect(hasherSpy.plainText).toBe(addAccountInput.password)
    })

    test('Should throw if Hasher throws', async() => {
      const { sut, hasherSpy } = makeSut()
      jest.spyOn(hasherSpy, 'hash').mockRejectedValueOnce(new Error())
      const promise = sut.add(mockAddAccountInput())
      await expect(promise).rejects.toThrow()
    })
  })

  describe('AddAccountRepository', () => {
    test('Should call AddAccountRepository with correct values', async() => {
      const { sut, addAccountRepositorySpy, hasherSpy } = makeSut()
      const addAccountInput = mockAddAccountInput()
      await sut.add(addAccountInput)
      expect(addAccountRepositorySpy.input).toEqual({
        ...addAccountInput,
        password: hasherSpy.digest
      })
    })

    test('Should throw if AddAccountRepository throws', async() => {
      const { sut, addAccountRepositorySpy } = makeSut()
      jest.spyOn(addAccountRepositorySpy, 'add').mockRejectedValueOnce(new Error())
      const promise = sut.add(mockAddAccountInput())
      await expect(promise).rejects.toThrow()
    })

    test('Should return an accountId on success', async() => {
      const { sut, addAccountRepositorySpy } = makeSut()
      const accountId = await sut.add(mockAddAccountInput())
      expect(accountId).toBe(addAccountRepositorySpy.output)
    })
  })
})
