import {
  createConnection,
  getConnectionOptions,
  Connection as TypeORMConnection,
} from 'typeorm'

export default class Connection {
  public async start(name = 'default'): Promise<TypeORMConnection> {
    const defaultOptions = await getConnectionOptions()

    return createConnection(
      Object.assign(defaultOptions, {
        name,
        database:
          process.env.NODE_ENV === 'testing'
            ? 'postgres'
            : defaultOptions.database,
      }),
    )
  }
}
