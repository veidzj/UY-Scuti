import { type Controller } from '@/presentation/protocols/controller'
import { type HttpResponse } from '@/presentation/protocols/http-response'
import { type AddAccount } from '@/domain/usecases/account/add-account'

export class AddAccountController implements Controller {
  constructor(private readonly addAccount: AddAccount) {}

  public async handle(request: AddAccountController.Request): Promise<HttpResponse> {
    await this.addAccount.add(request)
    return {
      statusCode: 200,
      body: {}
    }
  }
}

export namespace AddAccountController {
  export interface Request {
    username: string
  }
}
