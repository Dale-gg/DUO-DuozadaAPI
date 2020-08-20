module.exports = {
  name: 'default',
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ["./src/Modules/**/Infra/Typeorm/Entities/*{.ts,.js}"],
  migrations: ["./src/Shared/Infra/Typeorm/Migrations/*{.ts,.js}"],
  cli: {
    migrationsDir: "./src/Shared/Infra/Typeorm/Migrations/*{.ts,.js}"
  }
}
