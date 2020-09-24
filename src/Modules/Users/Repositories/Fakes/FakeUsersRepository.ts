import User from '@Modules/Users/Infra/Typeorm/Entities/User'
import IUsersRepository from '@Modules/Users/Repositories/IUsersRepository'
import ICreateUserDTO from '@Modules/Users/Dtos/ICreateUserDTO'
import { uuid } from 'uuidv4'

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = []

  public async all(user_id?: string): Promise<User[]> {
    let users = this.users

    if (user_id) {
      users = this.users.filter(userObj => userObj.id !== user_id)
    }

    return users
  }

  public async allWithLikeFilter(user_id: string): Promise<User[]> {
    const users = this.users

    const loggedUser = await this.findById(user_id)

    if (loggedUser) {
      const usersWithoutLoggedUser = this.users.filter(userObj => {
        if (userObj.id !== loggedUser.id) {
          return userObj
        }
      })

      if (loggedUser.likes) {
        const targetLikeUsersId = loggedUser.likes.map(
          like => like.target_user_id,
        )

        const usersWithoutLike = usersWithoutLoggedUser.filter(userObj => {
          const ids = targetLikeUsersId.filter(id => userObj.id !== id)
          const toStringIds = ids.toString()

          if (!toStringIds) {
            return false
          } else {
            return true
          }
        })

        if (loggedUser.dislikes) {
          const targetDislikeUsersId = loggedUser.dislikes.map(
            dislike => dislike.target_user_id,
          )

          const usersWithoutDislike = usersWithoutLike.filter(userObj => {
            const ids = targetDislikeUsersId.filter(id => userObj.id !== id)
            const toStringIds = ids.toString()

            if (!toStringIds) {
              return false
            } else {
              return true
            }
          })

          return usersWithoutDislike
        }

        return usersWithoutLike
      }

      return usersWithoutLoggedUser
    }

    return users
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id)

    return findUser
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email)

    return findUser
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User()

    Object.assign(user, { id: uuid(), status: true }, userData)

    this.users.push(user)

    return user
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id)

    this.users[findIndex] = user

    return user
  }
}

export default FakeUsersRepository
