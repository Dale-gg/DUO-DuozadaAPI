import 'reflect-metadata'

import express, { Application } from 'express'
import 'express-async-errors'

import IApp from './App/Interfaces/IApp'
import createConnection from './Database'
import Handler from './handler.error'

class App implements IApp {
  public app: Application
  private port: number
  private routes: []
  private database: boolean

  constructor(appConfig: { port: any; routes: any; database: boolean }) {
    this.app = express()
    this.port = appConfig.port
    this.routes = appConfig.routes
    this.database = appConfig.database
    this.createApp()
    this.handler()
  }

  public createApp(): void {
    this.app.use(express.json())
    this.app.use(this.routes)
    this.database ? this.createDatabase() : this.mochaDb()
    this.app.listen(this.port, () => {
      if (process.env.NODE_ENV === 'development') {
        console.log(`> [Duozada] Started development on port ${this.port}!`)
      } else if (process.env.NODE_ENV === 'testing') {
        console.log(`> [Duozada] Started testing on port ${this.port}!`)
      } else if (process.env.NODE_ENV === 'unitTesting') {
        console.log(`> [Duozada] Started unit tests on port ${this.port}!`)
      } else {
        console.log(`> [Duozada] Started on port ${this.port}!`)
      }
    })
  }

  private createDatabase(): void {
    createConnection()
    console.log('> [Database] Started!')
  }

  private mochaDb(): void {
    console.log('> [Mocking] Database for unit tests!')
  }

  private handler(): void {
    const errors = new Handler()

    this.app.use(errors.createHandler)
  }
}

export default App
