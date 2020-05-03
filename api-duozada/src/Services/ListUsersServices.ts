import { getRepository } from 'typeorm'
import User from '../Models/User'

// import AppError from '../Errors/AppError'

class ListUsersService {
  public async allUsers(): Promise<any> {
    
    const usersRepository = getRepository(User)
    const user = await usersRepository.find()
    await usersRepository.save(user)

    return user
  }

  public async userById({ id }: any): Promise<any> {
    const usersRepository = getRepository(User)
    const user = await usersRepository.findByIds(id)
    await usersRepository.save(user)

    console.log(user)
    return user
  }
}

export default ListUsersService