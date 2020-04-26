import { getRepository } from 'typeorm'
import User from '../Models/User'

import AppError from '../Errors/AppError'

interface IRequest {
  name: string
  email: string
  password: string
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
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
    })

    await usersRepository.save(user)

    return user
  }
}

export default CreateUserService
