import { ObjectID } from 'mongodb'
import Notification from '../../Infra/Typeorm/Schemas/Notification'
import INotificationsRepository from '@Modules/Notifications/Repositories/INotificationsRepository'
import ICreateNotificationDTO from '@Modules/Notifications/Dtos/ICreateNotificationDTO'

class FakeNotificationsRepository implements INotificationsRepository {
  private notifications: Notification[] = []

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = new Notification()

    Object.assign(notification, { id: new ObjectID(), content, recipient_id })

    this.notifications.push(notification)

    return notification
  }
}

export default FakeNotificationsRepository
