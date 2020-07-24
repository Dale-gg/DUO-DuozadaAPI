import { EnvClass } from '@Start/kernel'

const Env = new EnvClass()

export default {
  /*
  |--------------------------------------------------------------------------
  | Jwt
  |--------------------------------------------------------------------------
  |
  | The jwt authenticator works by passing a jwt token on each HTTP request
  | via HTTP `Authorization` header.
  |
  */
  jwt: {
    secret: Env.get('APP_KEY'),
    expiresIn: '1d',
  },
}
