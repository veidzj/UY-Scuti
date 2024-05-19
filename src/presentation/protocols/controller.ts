import { type HttpResponse } from '@/presentation/protocols/http-response'

export interface Controller<T = object> {
  handle: (request: T) => Promise<HttpResponse>
}
