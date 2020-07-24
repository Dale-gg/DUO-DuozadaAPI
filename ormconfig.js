const dbConfig = require('./config/database')

module.exports = {
  type: dbConfig.default.connection,
  host: dbConfig.default.pg.connection.host,
  port: dbConfig.default.pg.connection.port,
  username: dbConfig.default.pg.connection.user,
  password: dbConfig.default.pg.connection.password,
  database: dbConfig.default.pg.connection.database,
  entities: ['./app/domains/**/Infra/Entities/*.ts'],
  migrations: ['./database/migrations/*.ts'],
  cli: {
    migrationsDir: './database/migrations/*.ts',
  },
}
