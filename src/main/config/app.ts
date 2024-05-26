import express, { type Express } from 'express'

import { middlewares } from '@/main/config/middlewares'
import { routes } from '@/main/config/routes'

export const setupApp = async(): Promise<Express> => {
  const app = express()
  middlewares(app)
  await routes(app)
  return app
}
