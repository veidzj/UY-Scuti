import { type Collection, ObjectId } from 'mongodb'

import { AddAccountMongoRepository } from '@/infra/db/mongodb/account/add-account-mongo-repository'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { type AddAccountRepository } from '@/application/protocols/account/add-account-repository'

let accountCollection: Collection

const makeSut = (): AddAccountMongoRepository => {
  return new AddAccountMongoRepository()
}

const mockAddAccountRepositoryInput = (): AddAccountRepository.Input => ({
  username: '',
  email: '',
  password: ''
})

describe('AddAccountMongoRepository', () => {
  const mongoHelper: MongoHelper = MongoHelper.getInstance()

  beforeAll(async() => {
    await mongoHelper.connect(process.env.MONGO_URL ?? '')
  })

  afterAll(async() => {
    await mongoHelper.disconnect()
  })

  beforeEach(async() => {
    accountCollection = mongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  test('Should add an account on success', async() => {
    const sut = makeSut()
    const addAccountRepositoryInput = mockAddAccountRepositoryInput()

    const insertedId = await sut.add(addAccountRepositoryInput)

    const count = await accountCollection.countDocuments()
    const account = await accountCollection.findOne({ _id: new ObjectId(insertedId) })
    expect(count).toBe(1)
    expect(account).toEqual(addAccountRepositoryInput)
  })
})
