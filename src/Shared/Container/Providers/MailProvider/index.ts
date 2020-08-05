import { container } from 'tsyringe'

import IMailProvider from './Models/IMailProvider'
import mailConfig from '@Config/mail'

import EtherealMailProvider from './Implementations/EtherealMailProvider'
import SESMailProvider from './Implementations/SESMailProvider'

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider),
}

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver],
)
