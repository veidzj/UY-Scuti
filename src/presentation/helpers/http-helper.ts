import { type HttpResponse } from '@/presentation/protocols/http-response'

export const created = (data: object): HttpResponse => {
  return {
    statusCode: 201,
    body: data
  }
}

export const badRequest = (data: object): HttpResponse => {
  return {
    statusCode: 400,
    body: data
  }
}

export const conflict = (message: string): HttpResponse => {
  return {
    statusCode: 409,
    body: message
  }
}

export const serverError = (): HttpResponse => {
  return {
    statusCode: 500,
    body: 'The server has encountered an unexpected error'
  }
}
