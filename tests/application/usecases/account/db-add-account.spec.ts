import { CheckAccountByEmailRepositorySpy } from '@/tests/application/mocks/account/check-account-by-email-repository-mock'
import { mockAddAccountInput } from '@/tests/domain/mocks/account/add-account-mock'
import { DbAddAccount } from '@/application/usecases/account/db-add-account'

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
})
