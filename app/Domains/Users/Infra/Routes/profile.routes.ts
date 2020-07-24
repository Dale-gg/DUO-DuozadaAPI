import { Router } from 'express'

// import ensureAuthenticated from '@Domain/Users/Infra/Middlewares/ensureAuthenticated'
import ProfileController from '@Domain/Users/Infra/Controllers/ProfileController'

const profileRouter = Router()
const profileController = new ProfileController()

// profileRouter.use(ensureAuthenticated)

profileRouter.get('/', profileController.show)
profileRouter.put('/', profileController.update)

export default profileRouter
