module.exports = {
  name: 'default',
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 12345,
  database: 'postgres',
  entities: ['./src/Modules/**/Infra/Typeorm/Entities/*.ts'],
}