import { DbAddAccount } from '@/application/usecases/account/db-add-account'

describe('DbAddAccount', () => {
  test('Should call CheckAccountByEmailRepository with correct email', async() => {
    class CheckAccountByEmailRepositorySpy implements CheckAccountByEmailRepositorySpy {
      public email: string
      public output: boolean = false

      public async check(email: string): Promise<boolean> {
        this.email = email
        return this.output
      }
    }
    const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy()
    const sut = new DbAddAccount(checkAccountByEmailRepositorySpy)
    await sut.add({ username: 'any_username', email: 'any_email@mail.com' })
    expect(checkAccountByEmailRepositorySpy.email).toBe('any_email@mail.com')
  })
})
