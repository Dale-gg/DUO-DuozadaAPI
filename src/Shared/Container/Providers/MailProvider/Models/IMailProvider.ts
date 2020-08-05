import ISendMailDTO from '../Dtos/ISendMailDTO'

export default interface IMailProvider {
  sendMail(data: ISendMailDTO): Promise<void>
}
