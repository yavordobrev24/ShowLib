import { Router } from 'express'

import {
  getTVShows,
  getPopularTVShows,
  getTVShowById,
} from '../controllers/tvShowsController'
import cacheMiddleware from '../middlewares/cacheMiddleware'
import { getTVShowComments } from '../controllers/commentsController'

const router = Router()
export default router
