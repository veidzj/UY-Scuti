import { type Controller } from '@/presentation/protocols/controller'
import { type HttpResponse } from '@/presentation/protocols/http-response'
import { type AddAccount } from '@/domain/usecases/account/add-account'
import { created, serverError } from '@/presentation/helpers/http-helper'

export class AddAccountController implements Controller {
  constructor(private readonly addAccount: AddAccount) {}

  public async handle(request: AddAccountController.Request): Promise<HttpResponse> {
    try {
      const accountId = await this.addAccount.add(request)
      return created({ accountId })
    } catch (error) {
      return serverError()
    }
  }
}

export namespace AddAccountController {
  export interface Request {
    username: string
  }
}
