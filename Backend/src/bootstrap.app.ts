import express, { Application } from 'express'
import mongoose from 'mongoose'

class App {
  public app: Application
  public port: any

  constructor (appConfig: { port: any, middlewares: any, controllers: any }) {
    this.app = express()
    this.port = appConfig.port
    this.setMongooseConnection()
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

  private setMongooseConnection (): void {
    const user = process.env.MONGODB_USER
    const password = process.env.MONGODB_PASSWORD
    const cluster = process.env.MONGODB_CLUSTER
    const database = process.env.MONGODB_DATABASE

    mongoose.connect(`mongodb+srv://${user}:${password}@${cluster}/${database}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
  }
}

export default App
