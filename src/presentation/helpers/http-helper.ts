import { type HttpResponse } from '@/presentation/protocols/http-response'

export const created = (data: object): HttpResponse => {
  return {
    statusCode: 201,
    body: data
  }
}

export const serverError = (): HttpResponse => {
  return {
    statusCode: 500,
    body: 'The server has encountered an unexpected error'
  }
}
