require('ts-node/register')
import { config as configDotenv } from 'dotenv'
import { resolve } from 'path'

configDotenv({
  path: resolve(__dirname, './.env')
})

module.exports = {
    development: {
        client: 'pg',
        connection: process.env.DB_URL,
        migrations: {
            directory: './src/App/database/migrations',
            extension: 'ts'
        },
        useNullAsDefault: true
    },

    test: {
        client: "pg",
        connection: process.env.DB_URL,
        migrations: {
          directory: "./src/App/database/migrations"
        },
        useNullAsDefault: true
    },

    staging: {
        client: "pg",
        connection: process.env.DB_URL,
        pool: {
          min: 2,
          max: 10
        },
        migrations: {
          tableName: "knex_migrations"
        }
    },

    production: {
        client: process.env.DB_URL,
        pool: {
          min: 2,
          max: 10
        },
        migrations: {
          tableName: "knex_migrations"
        }
    }
};