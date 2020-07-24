import ServiceProvider from './ServiceProvider'

import UsersRepository from '@Domain/Users/Infra/Repositories/UsersRepository'
import IUsersRepository from '@Domain/Users/Infra/Repositories/IUsersRepository'

import UserTokensRepository from '@Domain/Users/Infra/Repositories/UserTokensRepository'
import IUserTokensRepository from '@Domain/Users/Infra/Repositories/IUserTokensRepository'

export default class UsersProvider extends ServiceProvider {
  register(): void {
    this.app.registerSingleton<IUsersRepository>(
      'UsersRepository',
      UsersRepository,
    )

    this.app.registerSingleton<IUserTokensRepository>(
      'UserTokensRepository',
      UserTokensRepository,
    )
  }
}
