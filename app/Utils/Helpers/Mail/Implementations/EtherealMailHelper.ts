import nodemailer, { Transporter } from 'nodemailer'
import { inject, injectable } from 'tsyringe'
import IMailHelper from '../Models/IMailHelper'
import ISendMailDTO from '../Dtos/ISendMailDTO'

import IMailTemplateHelper from '@Shared/Container/Helpers/MailTemplateHelper/Models/IMailTemplateHelper'

@injectable()
export default class EtherealMailHelper implements IMailHelper {
  private client: Transporter

  constructor(
    @inject('MailTemplateHelper')
    private mailTemplateHelper: IMailTemplateHelper,
  ) {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      })

      this.client = transporter
    })
  }

  public async sendMail({
    to,
    from,
    subject,
    template,
  }: ISendMailDTO): Promise<void> {
    const message = await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe GoBarber',
        address: from?.email || 'equipe@gobarber.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateHelper.parse(template),
    })

    console.log('Message sent: %s', message.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))
  }
}
