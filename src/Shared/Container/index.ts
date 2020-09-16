import { container } from 'tsyringe'

import '@Modules/Users/Providers'
import './Providers'

import IUsersRepository from '@Modules/Users/Repositories/IUsersRepository'
import UsersRepository from '@Modules/Users/Infra/Typeorm/Repositories/UsersRepository'

import IUserTokensRepository from '@Modules/Users/Repositories/IUserTokensRepository'
import UserTokensRepository from '@Modules/Users/Infra/Typeorm/Repositories/UserTokensRepository'

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

import IElosRepository from '@Modules/Users/Repositories/IElosRepository'
import ElosRepository from '@Modules/Users/Infra/Typeorm/Repositories/ElosRepository'

import IChatsRepository from '@Modules/Chat/Repositories/IChatsRepository'
import ChatsRepository from '@Modules/Chat/Infra/Typeorm/Repositories/ChatsRepository'

import IMessagesRepository from '@Modules/Chat/Repositories/IMessagesRepository'
import MessagesRepository from '@Modules/Chat/Infra/Typeorm/Repositories/MessagesRepository'

import IHighlightsRepository from '@Modules/Highlight/Repositories/IHighlightsRepository'
import HighlightsRepository from '@Modules/Highlight/Infra/Typeorm/Repositories/HighlightsRepository'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
)

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
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

container.registerSingleton<IChatsRepository>(
  'ChatsRepository',
  ChatsRepository,
)

container.registerSingleton<IElosRepository>('ElosRepository', ElosRepository)

container.registerSingleton<IMessagesRepository>(
  'MessagesRepository',
  MessagesRepository,
)

container.registerSingleton<IHighlightsRepository>(
  'HighlightsRepository',
  HighlightsRepository,
)
