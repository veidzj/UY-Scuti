import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { type AddAccountRepository } from '@/application/protocols/account/add-account-repository'

export class AddAccountMongoRepository implements AddAccountRepository {
  public readonly mongoHelper: MongoHelper = MongoHelper.getInstance()

  public async add(input: AddAccountRepository.Input): Promise<string> {
    const accountCollection = this.mongoHelper.getCollection('accounts')
    const query = await accountCollection.insertOne(input)
    return query.insertedId.toHexString()
  }
}
