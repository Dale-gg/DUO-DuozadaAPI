import * as dotenv from 'dotenv'
import App from './bootstrap.app'

import Routes from './Routes'

dotenv.config()
let path
switch (process.env.NODE_ENV) {
  case 'testing' || 'unitTesting':
    path = `${__dirname}/../../.env.testing`
    break

  default:
    path = `${__dirname}/../../.env`
}
dotenv.config({ path: path })

const endpoints = new Routes()

const app = new App({
  port: process.env.PORT || 3333,
  routes: endpoints.router,
  database: process.env.NODE_ENV !== 'unitTesting',
})

export default app.app
