import ServiceProvider from './ServiceProvider'

import IMailHelper from '@Utils/Helpers/Mail/Models/IMailHelper'
import EtherealMailHelper from '@Utils/Helpers/Mail/Implementations/EtherealMailHelper'

import IMailTemplateHelper from '@Utils/Helpers/Mail/Models/IMailTemplateHelper'
import HandlebarsMailTemplateHelper from '@Utils/Helpers/Mail/Implementations/HandlebarsMailTemplateHelper'

import IStorageHelper from '@Utils/Helpers/Storage/Models/IStorageHelper'
import DiskStorageHelper from '@Utils/Helpers/Storage/Implementations/DiskStorageHelper'

export default class HelpersProvider extends ServiceProvider {
  register(): void {
    this.app.registerSingleton<IMailHelper>(
      'MailHelper',
      this.app.resolve(EtherealMailHelper),
    )

    this.app.registerSingleton<IMailTemplateHelper>(
      'MailTemplateHelper',
      HandlebarsMailTemplateHelper,
    )

    this.app.registerSingleton<IStorageHelper>(
      'StorageHelper',
      DiskStorageHelper,
    )
  }
}
