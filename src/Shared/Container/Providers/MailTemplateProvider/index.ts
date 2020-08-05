import { container } from 'tsyringe'

import IMailTemplateProvider from './Models/IMailTemplateProvider'

import HandlebarsMailTemplateProvider from './Implementations/HandlebarsMailTemplateProvider'

const providers = {
  handlebars: HandlebarsMailTemplateProvider,
}

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  providers.handlebars,
)
