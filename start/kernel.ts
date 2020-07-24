export class EnvClass {
  public get(name: string, defaultValue?: any): any {
    if (process.env[`${name}`]) {
      return process.env[`${name}`]
    }

    return defaultValue
  }
}
