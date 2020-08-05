import ICreateNotificationDTO from '../Dtos/ICreateNotificationDTO'
import Notification from '../Infra/Typeorm/Schemas/Notification'

export default interface INotificationsRepository {
  create(data: ICreateNotificationDTO): Promise<Notification>
}
