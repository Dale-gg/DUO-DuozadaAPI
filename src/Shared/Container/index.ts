import { container } from 'tsyringe'

import '@Modules/Users/Providers'
import './Providers'

import IUsersRepository from '@Modules/Users/Repositories/IUsersRepository'
import UsersRepository from '@Modules/Users/Infra/Typeorm/Repositories/UsersRepository'

import IUserTokensRepository from '@Modules/Users/Repositories/IUserTokensRepository'
import UserTokensRepository from '@Modules/Users/Infra/Typeorm/Repositories/UserTokensRepository'

import INotificationsRepository from '@Modules/Notifications/Repositories/INotificationsRepository'
import NotificationsRepository from '@Modules/Notifications/Infra/Typeorm/Repositories/NotificationsRepository'

import ILikesRepository from '@Modules/LikeDislike/Repositories/ILikesRepository'
import LikesRepository from '@Modules/LikeDislike/Infra/Typeorm/Repositories/LikesRepository'

import IDislikesRepository from '@Modules/LikeDislike/Repositories/IDislikesRepository'
import DislikesRepository from '@Modules/LikeDislike/Infra/Typeorm/Repositories/DislikesRepository'

import IDuozadasRepository from '@Modules/LikeDislike/Repositories/IDuozadasRepository'
import DuozadasRepository from '@Modules/LikeDislike/Infra/Typeorm/Repositories/DuozadasRepository'

import ILanesRepository from '@Modules/Users/Repositories/ILanesRepository'
import LanesRepository from '@Modules/Users/Infra/Typeorm/Repositories/LanesRepository'

import IChampionsRepository from '@Modules/Users/Repositories/IChampionsRepository'
import ChampionsRepository from '@Modules/Users/Infra/Typeorm/Repositories/ChampionsRepository'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
)

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
)

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository,
)

container.registerSingleton<ILikesRepository>(
  'LikesRepository',
  LikesRepository,
)

container.registerSingleton<IDuozadasRepository>(
  'DuozadasRepository',
  DuozadasRepository,
)

container.registerSingleton<IDislikesRepository>(
  'DislikesRepository',
  DislikesRepository,
)

container.registerSingleton<ILanesRepository>(
  'LanesRepository',
  LanesRepository,
)

container.registerSingleton<IChampionsRepository>(
  'ChampionsRepository',
  ChampionsRepository,
)
