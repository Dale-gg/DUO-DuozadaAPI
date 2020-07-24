import { EnvClass } from '@Start/kernel'

const Env = new EnvClass()

export default {
  /*
  |--------------------------------------------------------------------------
  | Default Connection
  |--------------------------------------------------------------------------
  |
  | Connection defines the default connection settings to be used while
  | interacting with SQL databases.
  |
  */
  connection: Env.get('DB_CONNECTION', 'sqlite'),

  /*
  |--------------------------------------------------------------------------
  | Sqlite
  |--------------------------------------------------------------------------
  |
  | Sqlite is a flat file database and can be a good choice for a development
  | environment.
  |
  | npm i --save sqlite3
  |
  */
  sqlite: {
    client: 'sqlite3',
    connection: {
      filename: `${Env.get('DB_DATABASE', 'development')}.sqlite`,
    },
    debug: Env.get('DB_DEBUG', false),
  },

  /*
  |--------------------------------------------------------------------------
  | MySQL
  |--------------------------------------------------------------------------
  |
  | Here we define connection settings for MySQL database.
  |
  | npm i --save mysql
  |
  */
  mysql: {
    client: 'mysql',
    connection: {
      host: Env.get('DB_HOST', 'localhost'),
      port: Env.get('DB_PORT', '3307'),
      user: Env.get('DB_USER', 'root'),
      password: Env.get('DB_PASSWORD', '12345'),
      database: Env.get('DB_DATABASE', 'expresstsmysql'),
    },
    debug: Env.get('DB_DEBUG', 'false') === 'true',
  },

  /*
  |--------------------------------------------------------------------------
  | PostgreSQL
  |--------------------------------------------------------------------------
  |
  | Here we define connection settings for PostgreSQL database.
  |
  | npm i --save pg
  |
  */
  pg: {
    client: 'pg',
    connection: {
      host: Env.get('DB_HOST', 'localhost'),
      port: Env.get('DB_PORT', '5432'),
      user: Env.get('DB_USER', 'root'),
      password: Env.get('DB_PASSWORD', '12345'),
      database: Env.get('DB_DATABASE', 'expresstspostgresql'),
    },
    debug: Env.get('DB_DEBUG', false),
  },
}
