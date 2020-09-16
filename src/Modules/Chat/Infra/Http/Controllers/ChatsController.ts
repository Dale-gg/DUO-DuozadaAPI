import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListAllChatsService from '@Modules/Chat/Services/ListAllChatsService'
import ListOneChatService from '@Modules/Chat/Services/ListOneChatService'

export default class ChatsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id

    const listAllService = container.resolve(ListAllChatsService)

    const chatsByUserId = await listAllService.execute({
      user_id,
    })

    return response.json(chatsByUserId)
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const { chat_id } = request.params

    const listOneService = container.resolve(ListOneChatService)

    const chatWithMessages = await listOneService.execute({
      user_id,
      chat_id,
    })

    return response.json(chatWithMessages)
  }
}
