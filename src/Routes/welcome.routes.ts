import { Router, Request, Response } from 'express'

const routes = Router()

routes.get('/', (request: Request, response: Response) => {
  return response.json({
    project: process.env.APP_NAME,
    prefix: process.env.APP_PREFIX,
    welcome: 'Welcome to Duozada DevAPI',
    repository: {
      openSource: 'This is a open source project by Duozada Organization!',
      repository: 'https://github.com/Dale-gg/DUO-DuozadaAPI',
    },
    endpoints: {
      whereFind: 'You can find all endpoints in our Github repository',
      quickExample: {
        Users: {
          any: '',
        },
        Sessions: {
          any: '',
        },
      },
    },
    withLove: {
      contributor1: {
        nickname: 'jlenon7',
        repository: 'https://github.com/jlenon7',
      },
      contributor2: {
        nickname: 'Adryell',
        repository: 'https://github.com/Adryell',
      },
    },
  })
})

export default routes
