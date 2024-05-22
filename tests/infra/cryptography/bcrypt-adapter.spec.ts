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
})
