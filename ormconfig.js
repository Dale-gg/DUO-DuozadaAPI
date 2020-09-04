module.exports = {
  name: 'default',
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ["./dist/Modules/**/Infra/Typeorm/Entities/*.js"],
  migrations: ["./dist/Shared/Infra/Typeorm/Migrations/*.js"],
  cli: {
    migrationsDir: "./dist/Shared/Infra/Typeorm/Migrations/*.js"
  }
}
