import { Router } from 'express'

const welcomeRouter = Router()

welcomeRouter.get('/', (_, response) => {
  return response.json({
    prefix: '/duo/v1',
    welcome: 'Welcome to Duozada DevAPI',
    repository: {
      openSource: 'This is a open source project by Dale.gg Organization!',
      repository: 'https://github.com/Dale-gg/Duozada',
    },
    endpoints: {
      whereFind: 'You can find all endpoints in our Github repository',
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

export default welcomeRouter
