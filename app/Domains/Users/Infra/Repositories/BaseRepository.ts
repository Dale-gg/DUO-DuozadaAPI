import {
  UnauthorizedException,
  InternalErrorException,
} from '@jlenon7/dedsec/build/Exceptions'

class BaseRepository {
  public request: Request
  public _guard: object

  setGuard(guard: object): any {
    this._guard = guard
    return this
  }

  setRequest(request: Request): any {
    this.request = request
    return this
  }

  getParams(): object | null {
    return this.request.body
  }

  get guard(): object {
    if (!this._guard) {
      throw new InternalErrorException('UNSET_GUARD')
    }
    return this._guard
  }

  newQuery(): any {
    throw new Error('Please implements method newQuery')
  }

  makeUnauthorizedException(code: string): UnauthorizedException {
    return new UnauthorizedException(code)
  }

  makeInternalErrorException(code: string): InternalErrorException {
    return new InternalErrorException(code)
  }
}

export default BaseRepository
