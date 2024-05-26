import { type Router } from 'express'

export default (router: Router): void => {
  router.get('/health-check', (req, res) => {
    res.status(200).send()
  })
}
