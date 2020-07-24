import handlebars from 'handlebars'
import IParseMailTemplateDTO from '../Dtos/IParseMailTemplateDTO'
import IMailTemplateHelper from '../Models/IMailTemplateHelper'
import fs from 'fs'

export default class HandlebarsMailTemplateHelper
  implements IMailTemplateHelper {
  public async parse({
    file,
    variables,
  }: IParseMailTemplateDTO): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    })

    const parseTemplate = handlebars.compile(templateFileContent)

    return parseTemplate(variables)
  }
}
