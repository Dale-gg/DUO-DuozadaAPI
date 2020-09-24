import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import UpdateProfileService from '@Modules/Users/Services/UpdateProfileService'
import DeleteProfileService from '@Modules/Users/Services/DeleteProfileService'
import ShowProfileService from '@Modules/Users/Services/ShowProfileService'
import UpdateRelationsService from '@Modules/Users/Services/UpdateRelationsService'

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id

    const showProfile = container.resolve(ShowProfileService)

    const user = await showProfile.execute({ user_id })

    return response.json(classToClass(user))
  }

  public async update(request: Request, response: Response): Promise<Response> {
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

    return response.json(classToClass(user))
  }

  public async updateRelations(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const user_id = request.user.id
    const { lanes, champions, elos } = request.body

    const updateRelations = container.resolve(UpdateRelationsService)

    const user = await updateRelations.execute({
      user_id,
      lanes,
      champions,
      elos,
    })

    return response.json(classToClass(user))
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id

    const deleteProfile = container.resolve(DeleteProfileService)

    await deleteProfile.execute(user_id)

    return response.status(204).json()
  }
}
