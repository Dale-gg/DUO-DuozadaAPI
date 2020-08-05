import IMailTemplateProvider from '../Models/IMailTemplateProvider'

export default class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse(): Promise<string> {
    return 'Mail content'
  }
}
