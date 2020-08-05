import handlebars from 'handlebars'
import IParseMailTemplateDTO from '../Dtos/IParseMailTemplateDTO'
import IMailTemplateProvider from '../Models/IMailTemplateProvider'
import fs from 'fs'

export default class HandlebarsMailTemplateProvider
  implements IMailTemplateProvider {
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
