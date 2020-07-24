import { Router } from 'express'

import ForgotPasswordController from '@Domain/Users/Infra/Controllers/ForgotPasswordController'
import ResetPasswordController from '@Domain/Users/Infra/Controllers/ResetPasswordController'

const passwordRouter = Router()
const forgotPasswordController = new ForgotPasswordController()
const resetPasswordController = new ResetPasswordController()

passwordRouter.post('/forgot', forgotPasswordController.store)
passwordRouter.post('/reset', resetPasswordController.store)

export default passwordRouter
