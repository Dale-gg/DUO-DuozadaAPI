/* eslint-disable @typescript-eslint/no-empty-function */
import { container } from 'tsyringe'

export default class ServiceProvider {
  protected app: typeof container = container

  public register(): void {}
  public boot(): void {}
}
