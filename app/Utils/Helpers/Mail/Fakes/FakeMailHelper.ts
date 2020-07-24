import IMailHelper from '../Models/IMailHelper'
import ISendMailDTO from '../DTO/ISendMailDTO'

export default class FakeMailHelper implements IMailHelper {
  private messages: ISendMailDTO[] = []

  public async sendMail(message: ISendMailDTO): Promise<void> {
    this.messages.push(message)
  }
}
