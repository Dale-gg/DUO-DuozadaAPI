import nodemailer, { Transporter } from 'nodemailer'
import aws from 'aws-sdk'
import { inject, injectable } from 'tsyringe'
import IMailProvider from '../Models/IMailProvider'
import ISendMailDTO from '../Dtos/ISendMailDTO'
import mailConfig from '@Config/mail'

import IMailTemplateProvider from '@Shared/Container/Providers/MailTemplateProvider/Models/IMailTemplateProvider'

@injectable()
export default class SESMailProvider implements IMailProvider {
  private client: Transporter

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
        region: 'us-east-1',
      }),
    })
  }

  public async sendMail({
    to,
    from,
    subject,
    template,
  }: ISendMailDTO): Promise<void> {
    const { name, email } = mailConfig.defaults.from

    await this.client.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(template),
    })
  }
}
