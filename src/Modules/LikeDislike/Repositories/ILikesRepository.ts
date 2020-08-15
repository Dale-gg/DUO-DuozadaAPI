import Like from '@Modules/LikeDislike/Infra/Typeorm/Entities/Like'
import ICreateLikeDTO from '@Modules/LikeDislike/Dtos/ICreateLikeDTO'

export default interface ILikesRepository {
  findByUsersIds(
    user_id: string,
    target_user_id: string,
  ): Promise<Like | undefined>
  create(likeData: ICreateLikeDTO): Promise<Like>
  save(like: Like): Promise<Like>
}
