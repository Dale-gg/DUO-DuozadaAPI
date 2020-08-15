import Dislike from '@Modules/LikeDislike/Infra/Typeorm/Entities/Dislike'
import IDislikesRepository from '@Modules/LikeDislike/Repositories/IDislikesRepository'
import ICreateDislikeDTO from '@Modules/LikeDislike/Dtos/ICreateDislikeDTO'
import { uuid } from 'uuidv4'

class FakeDislikesRepository implements IDislikesRepository {
  private dislikes: Dislike[] = []

  public async findByUsersIds(
    user_id: string,
    target_user_id: string,
  ): Promise<Dislike | undefined> {
    const findDislike = this.dislikes.find(
      dislike =>
        dislike.user_id === user_id &&
        dislike.target_user_id === target_user_id,
    )

    return findDislike
  }

  public async create(dislikeData: ICreateDislikeDTO): Promise<Dislike> {
    const dislike = new Dislike()

    Object.assign(dislike, { id: uuid() }, dislikeData)

    this.dislikes.push(dislike)

    return dislike
  }

  public async save(dislike: Dislike): Promise<Dislike> {
    const findIndex = this.dislikes.findIndex(
      findDislike => findDislike.id === dislike.id,
    )

    this.dislikes[findIndex] = dislike

    return dislike
  }
}

export default FakeDislikesRepository
