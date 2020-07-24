import { EnvClass } from '@Start/kernel'

import pjson from '../package.json'

const Env = new EnvClass()

export default {
  /*
  |--------------------------------------------------------------------------
  | Application Name
  |--------------------------------------------------------------------------
  |
  | This value is the name of your application and can used when you
  | need to place the application's name in a email, view or
  | other location.
  |
  */
  name: Env.get('APP_NAME', 'ExpressTS'),
  env: Env.get('NODE_ENV', 'local'),
  prefix: Env.get('APP_PREFIX', '/api'),
  version: pjson.version,

  locales: {
    /*
    |--------------------------------------------------------------------------
    | Default Locale
    |--------------------------------------------------------------------------
    |
    | Default locale to be used by Antl provider. You can always switch drivers
    | in runtime or use the official Antl middleware to detect the driver
    | based on HTTP headers/query string.
    |
    */
    locale: 'en',
  },
}
