import { type Controller } from '@/presentation/protocols/controller'
import { type HttpResponse } from '@/presentation/protocols/http-response'
import { type Validation } from '@/presentation/protocols/validation'
import { badRequest, conflict, created, serverError } from '@/presentation/helpers/http-helper'
import { ValidationError } from '@/validation/errors/validation-error'
import { type AddAccount } from '@/domain/usecases/account/add-account'
import { EmailInUseError } from '@/domain/errors/account/email-in-use-error'

export class AddAccountController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addAccount: AddAccount
  ) {}

  public async handle(request: AddAccountController.Request): Promise<HttpResponse> {
    try {
      this.validation.validate(request)
      const accountId = await this.addAccount.add(request)
      return created({ accountId })
    } catch (error) {
      if (error instanceof ValidationError) {
        return badRequest(error)
      }
      if (error instanceof EmailInUseError) {
        return conflict(error)
      }
      return serverError()
    }
  }
}

export namespace AddAccountController {
  export interface Request {
    username: string
    email: string
    password: string
  }
}
