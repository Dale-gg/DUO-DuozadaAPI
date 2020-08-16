import Like from '@Modules/LikeDislike/Infra/Typeorm/Entities/Like'
import ILikesRepository from '@Modules/LikeDislike/Repositories/ILikesRepository'
import ICreateLikeDTO from '@Modules/LikeDislike/Dtos/ICreateLikeDTO'
import { uuid } from 'uuidv4'

class FakeLikesRepository implements ILikesRepository {
  private likes: Like[] = []

  public async findByUsersIds(
    user_id: string,
    target_user_id: string,
  ): Promise<Like | undefined> {
    const findLike = this.likes.find(
      like =>
        like.user_id === user_id && like.target_user_id === target_user_id,
    )

    return findLike
  }

  public async create(likeData: ICreateLikeDTO): Promise<Like> {
    const like = new Like()

    Object.assign(like, { id: uuid() }, likeData)

    this.likes.push(like)

    return like
  }

  public async save(like: Like): Promise<Like> {
    const findIndex = this.likes.findIndex(findLike => findLike.id === like.id)

    this.likes[findIndex] = like

    return like
  }
}

export default FakeLikesRepository
