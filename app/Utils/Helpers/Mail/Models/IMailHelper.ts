import ISendMailDTO from '../DTO/ISendMailDTO'

export default interface IMailHelper {
  sendMail(data: ISendMailDTO): Promise<void>
}
