import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import UpdateHighlightService from '@Modules/Highlight/Services/UpdateHighlightService'
import CreateHighlightService from '@Modules/Highlight/Services/CreateHighlightService'
import ListAllHighlightsService from '@Modules/Highlight/Services/ListAllHighlightsService'
import ListOneHighlightService from '@Modules/Highlight/Services/ListOneHighlightService'

export default class HighlightsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id

    const listAll = container.resolve(ListAllHighlightsService)

    const highlights = await listAll.execute({
      user_id,
    })

    return response.json(classToClass(highlights))
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const { title, desc } = request.body
    const mediaFilename = request.file.filename

    const createHighlight = container.resolve(CreateHighlightService)

    const highlight = await createHighlight.execute({
      title,
      desc,
      mediaFilename,
      user_id,
    })

    return response.json(classToClass(highlight))
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const { id } = request.params

    const listOne = container.resolve(ListOneHighlightService)

    const highlight = await listOne.execute({
      user_id,
      id,
    })

    return response.json(classToClass(highlight))
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const { id } = request.params
    const { title, desc } = request.body
    const mediaFilename = request.file.filename

    const updateHighlight = container.resolve(UpdateHighlightService)

    const highlight = await updateHighlight.execute({
      title,
      desc,
      mediaFilename,
      user_id,
      id,
    })

    return response.json(classToClass(highlight))
  }
}
