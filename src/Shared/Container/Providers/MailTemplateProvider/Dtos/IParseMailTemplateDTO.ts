interface ITemplateVariables {
  [key: string]: string | number
}

export default interface IParseMailTemplateDto {
  file: string
  variables: ITemplateVariables
}
