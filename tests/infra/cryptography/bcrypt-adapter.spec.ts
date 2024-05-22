import bcrypt from 'bcrypt'
import { faker } from '@faker-js/faker'

import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return digest
  }
}))

const salt: number = Number(12)
const plainText: string = faker.word.words()
const digest: string = faker.word.words()

describe('BcryptAdapter', () => {
  test('Should call hash with correct values', async() => {
    const sut = new BcryptAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.hash(plainText)
    expect(hashSpy).toHaveBeenCalledWith(plainText, salt)
  })

  test('Should throw if hash throws', async() => {
    const sut = new BcryptAdapter(salt)
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.hash(plainText)
    await expect(promise).rejects.toThrow()
  })

  test('Should return a hashed value on success', async() => {
    const sut = new BcryptAdapter(salt)
    const hashedValue = await sut.hash(plainText)
    expect(hashedValue).toBe(digest)
  })
})
