import { type Collection, ObjectId } from 'mongodb'

import { mockAddAccountRepositoryInput } from '@/tests/application/mocks/account/add-account-repository-mock'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { AddAccountMongoRepository } from '@/infra/db/mongodb/account/add-account-mongo-repository'

let accountCollection: Collection

const makeSut = (): AddAccountMongoRepository => {
  return new AddAccountMongoRepository()
}

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
