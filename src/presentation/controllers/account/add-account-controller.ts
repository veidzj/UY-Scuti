import { type Controller } from '@/presentation/protocols/controller'
import { type HttpResponse } from '@/presentation/protocols/http-response'
import { type AddAccount } from '@/domain/usecases/account/add-account'
import { conflict, created, serverError } from '@/presentation/helpers/http-helper'
import { EmailInUseError } from '@/domain/errors/account/email-in-use-error'

export class AddAccountController implements Controller {
  constructor(private readonly addAccount: AddAccount) {}

  public async handle(request: AddAccountController.Request): Promise<HttpResponse> {
    try {
      const accountId = await this.addAccount.add(request)
      return created({ accountId })
    } catch (error) {
      if (error instanceof EmailInUseError) {
        return conflict(error.message)
      }
      return serverError()
    }
  }
}

export namespace AddAccountController {
  export interface Request {
    username: string
  }
}
