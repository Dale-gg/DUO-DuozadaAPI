import { Router } from 'express'

import multer from 'multer'
import uploadConfig from '@Config/upload'
import ensureAuthenticated from '@Modules/Users/Infra/Http/Middlewares/ensureAuthenticated'

import HighlightsController from '@Modules/Highlight/Infra/Http/Controllers/HighlightsController'

const highlightsRouter = Router()
const highlightsController = new HighlightsController()
const upload = multer(uploadConfig.multer)

highlightsRouter.get('/', ensureAuthenticated, highlightsController.index)
highlightsRouter.get('/:id', ensureAuthenticated, highlightsController.show)
highlightsRouter.post(
  '/',
  ensureAuthenticated,
  upload.single('media'),
  highlightsController.store,
)

export default highlightsRouter
