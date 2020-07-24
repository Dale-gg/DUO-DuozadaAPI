import express, { Application as ExpressApp } from 'express'
// import { HelpersProvider, UsersProvider } from '@Providers'

import Connection from '@Database/connection'

export default class Application {
  public app: ExpressApp
  private port: number
  private middlewares: any[]
  private routes: any[]
  private database: Connection
  private name: string | boolean | undefined
  private prefix: string | boolean | undefined

  constructor(configs: {
    middlewares: any[]
    routes: any[]
    port: number
    database: Connection
    name: string | boolean | undefined
    prefix: string | boolean | undefined
  }) {
    this.app = express()
    this.name = configs.name
    this.port = configs.port
    this.prefix = configs.prefix
    this.routes = configs.routes
    this.database = configs.database
    this.middlewares = configs.middlewares
    this.StartApplication()
  }

  public async StartApplication(): Promise<void> {
    this.database ? await this.RunDatabaseCluster() : this.MockDatabaseCluster()
    this.app.use(express.json())
    await this.BootRoutes(this.routes)
    await this.BootMiddlewares(this.middlewares)
    this.RegisterProviders()
    this.app.listen(this.port, () =>
      console.log(`🚀 ${this.name} started on port ${this.port}! 🤯`),
    )
  }

  private async RunDatabaseCluster(): Promise<void> {
    this.database.start()
  }

  private async MockDatabaseCluster(): Promise<void> {
    console.log('> Mocking database cluster')
  }

  private async BootMiddlewares(middlewares: any[]): Promise<void> {
    middlewares.forEach((middleware: any) => {
      this.app.use(middleware)
    })
  }

  private async BootRoutes(routes: any[]): Promise<void> {
    routes.forEach((route: any) => {
      this.app.use(`${this.prefix}`, route)
    })
  }

  private RegisterProviders(): void {
    // new UsersProvider().register()
    // new HelpersProvider().register()
  }
}
