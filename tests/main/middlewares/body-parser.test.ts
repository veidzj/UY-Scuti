import { type Express } from 'express'
import request from 'supertest'
import { faker } from '@faker-js/faker'

import { setupApp } from '@/main/config/app'

const route: string = '/test_body_parser'
const data = {
  username: faker.internet.userName()
}

describe('BodyParser Middleware', () => {
  let app: Express

  beforeAll(async() => {
    app = await setupApp()
  })

  test('Should parse body as json', async() => {
    app.post(route, (req, res) => {
      res.send(req.body)
    })

    await request(app)
      .post(route)
      .send(data)
      .expect(data)
  })
})
