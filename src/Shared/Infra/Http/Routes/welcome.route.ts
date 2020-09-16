import { Router } from 'express'
import pjson from '../../../../../package.json'

const welcomeRouter = Router()

welcomeRouter.get('/', (_, response) => {
  return response.json({
    prefix: '/duo/v1',
    domain: 'DUO - Duozada',
    version: `${pjson.version}`,
    greeting: 'Welcome to Duozada API!',
  })
})

export default welcomeRouter
