import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { SecResponse } from '@jlenon7/dedsec/build/Responses'

import UpdateProfileService from '@Domain/Users/Infra/Services/UpdateProfileService'
import ShowProfileService from '@Domain/Users/Infra/Services/ShowProfileService'

export default class ProfileController {
  private responseSec: any

  constructor() {
    this.responseSec = new SecResponse()
  }

  public async show(request: any, response: Response): Promise<Response> {
    const user_id = request.user.id

    const showProfile = container.resolve(ShowProfileService)
    const user = await showProfile.execute({ user_id })
    delete user.password

    return response.json(this.responseSec.withOne(user))
  }

  public async update(request: any, response: Response): Promise<Response> {
    const user_id = request.user.id
    const { name, email, old_password, password } = request.body

    const updateProfile = container.resolve(UpdateProfileService)
    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      old_password,
      password,
    })

    delete user.password

    return response.json(this.responseSec.withUpdated(user))
  }
}
