import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'
import ForgotPasswordController from '@Modules/Users/Infra/Http/Controllers/ForgotPasswordController'
import ResetPasswordController from '@Modules/Users/Infra/Http/Controllers/ResetPasswordController'

const passwordRouter = Router()
const forgotPasswordController = new ForgotPasswordController()
const resetPasswordController = new ResetPasswordController()

passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  forgotPasswordController.store,
)
passwordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  resetPasswordController.store,
)

export default passwordRouter
