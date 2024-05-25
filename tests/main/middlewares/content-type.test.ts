import { type Express } from 'express'
import request from 'supertest'

import { setupApp } from '@/main/config/app'

const route: string = '/test_content_type'

let app: Express

describe('ContentType Middleware', () => {
  beforeAll(async() => {
    app = await setupApp()
  })

  test('Should return default content type as json', async() => {
    app.get(route, (req, res) => {
      res.send()
    })

    await request(app)
      .get(route)
      .expect('content-type', /json/)
  })
})
