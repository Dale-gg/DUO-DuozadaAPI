import Dislike from '@Modules/LikeDislike/Infra/Typeorm/Entities/Dislike'
import ICreateDislikeDTO from '@Modules/LikeDislike/Dtos/ICreateDislikeDTO'

export default interface IDislikesRepository {
  findByUsersIds(
    user_id: string,
    target_user_id: string,
  ): Promise<Dislike | undefined>
  create(data: ICreateDislikeDTO): Promise<Dislike>
  save(dislike: Dislike): Promise<Dislike>
}
