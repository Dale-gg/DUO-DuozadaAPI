import IParseMailTemplateDto from '../Dtos/IParseMailTemplateDTO'

export default interface IMailTemplateProvider {
  parse(data: IParseMailTemplateDto): Promise<string>
}
