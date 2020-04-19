import express, { Application } from 'express'

// const knex = require('knex')

class App {
  public app: Application
  public port: any

  constructor (appConfig: { port: any, middlewares: any, controllers: any }) {
    this.app = express()
    this.port = appConfig.port
    // this.setPgConnection()
    this.setMiddlewares(appConfig.middlewares)
    this.setControllers(appConfig.controllers)
  }

  public listen (): void {
    this.app.listen(this.port, () => console.log(`🚀 Duozada started at port ${this.port} 🤯`))
  }

  private setMiddlewares (middlewares: { forEach: (mid: (middleware: any) => void) => void }): void {
    middlewares.forEach(middleware => {
      this.app.use(middleware)
    })
  }

  private setControllers (controllers: { forEach: (con: (controller: any) => void) => void }): void {
    controllers.forEach(controller => {
      this.app.use('/', controller.router)
    })
  }

  /* private setPgConnection (): void {
    const host = process.env.DB_HOST
    const port = process.env.DB_PORT
    const username = process.env.DB_USER
    const password = process.env.DB_PASSWORD
    const database = process.env.DB_DATABASE

    new knex ({
      client: 'pg',
      connection: {
        host: host,
        port: port,
        user: username,
        password: password,
        database: database
      }
    })
  }*/
}

export default App
