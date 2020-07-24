import IParseMailTemplateDto from '../Dtos/IParseMailTemplateDTO'

export default interface IMailTemplateHelper {
  parse(data: IParseMailTemplateDto): Promise<string>
}
