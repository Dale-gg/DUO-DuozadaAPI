import * as dotenv from 'dotenv'
import appConfig from '@Config/app'

dotenv.config()
let path
switch (appConfig.env) {
  case 'testing':
    path = `${__dirname}/../../.env.testing`
    break
  case 'unitTesting':
    path = `${__dirname}/../../.env.testing`
    break
  default:
    path = `${__dirname}/../../.env`
}
dotenv.config({ path: path })
