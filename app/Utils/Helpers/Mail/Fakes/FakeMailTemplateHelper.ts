import IMailTemplateHelper from '../Models/IMailTemplateHelper'

export default class FakeMailTemplateHelper implements IMailTemplateHelper {
  public async parse(): Promise<string> {
    return 'Mail content'
  }
}
