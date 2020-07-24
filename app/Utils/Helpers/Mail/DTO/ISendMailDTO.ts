import IParseMailTemplateDTO from '@Shared/Container/Providers/MailTemplateProvider/Dtos/IParseMailTemplateDTO'

interface IMailContact {
  name: string
  email: string
}

export default interface ISendMailDTO {
  to: IMailContact
  from?: IMailContact
  subject: string
  template: IParseMailTemplateDTO
}
