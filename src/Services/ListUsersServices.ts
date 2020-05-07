/* eslint-disable prettier/prettier */
import { getRepository } from 'typeorm'
import User from '../Models/User'
import AppError from '../Errors/AppError'

class ListUsersService {
  public async allUsers(): Promise<User[]> {
    const usersRepository = getRepository(User)
    const user = await usersRepository.find()
    await usersRepository.save(user)

    return user
  }

  public async userById(id: string): Promise<User | AppError> {
    try {
      const usersRepository = getRepository(User)
      const user = await usersRepository.findOne(id)

      if (user) {
        await usersRepository.save(user)

        return user
      }

      throw new AppError('User não encontrado', 400)
    } catch (error) {
      throw new AppError(error.message, error.status)
    }
  }
}

export default ListUsersService
