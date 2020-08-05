import Notification from '@Modules/Notifications/Infra/Typeorm/Schemas/Notification'
import INotificationsRepository from '@Modules/Notifications/Repositories/INotificationsRepository'
import ICreateNotificationDTO from '@Modules/Notifications/Dtos/ICreateNotificationDTO'

import { getMongoRepository, MongoRepository } from 'typeorm'

class NotificationsRepository implements INotificationsRepository {
  private ormRepository: MongoRepository<Notification>

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo')
  }

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.ormRepository.create({
      content,
      recipient_id,
    })

    await this.ormRepository.save(notification)

    return notification
  }
}

export default NotificationsRepository
