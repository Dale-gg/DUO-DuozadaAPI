module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['./src/App/Models/*.ts', './src/App/Models/*.js'],
  migrations: [
    './src/Database/migrations/*.ts',
    './src/Database/migrations/*.js',
  ],
  cli: {
    migrationsDir: './src/Database/migrations',
  },
}
