import { getRepository } from 'typeorm'
import User from '../Models/User'

import AppError from '../Errors/AppError'

interface IRequest {
  name: string
  email: string
  password: string
  avatar: string
  champions: string
  routes: string
  media: string
}

class CreateUserService {
  public async execute({ name, email, password, avatar, champions, routes, media }: IRequest): Promise<User> {
    const usersRepository = getRepository(User)

    const checkUsersExists = await usersRepository.findOne({
      where: { email },
    })

    if (checkUsersExists) {
      throw new AppError('Email address already used.')
    }

    const user = usersRepository.create({
      name,
      email,
      password,
      avatar,
      champions,
      routes,
      media
    })

    await usersRepository.save(user)

    return user
  }
}

export default CreateUserService
