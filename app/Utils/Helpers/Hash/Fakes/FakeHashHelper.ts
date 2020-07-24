import IHashHelper from '../Models/IHashHelper'

export default class FakeHashHelper implements IHashHelper {
  public async generateHash(payload: string): Promise<string> {
    return payload
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed
  }
}
