import { Router } from 'express'

import {
  getTVShows,
  getPopularTVShows,
  getTVShowById,
} from '../controllers/tvShowsController'
import cacheMiddleware from '../middlewares/cacheMiddleware'
import { getTVShowComments } from '../controllers/commentsController'

const router = Router()

router.get('/', cacheMiddleware, getTVShows)
router.get('/popular', cacheMiddleware, getPopularTVShows)
router.get('/:id', cacheMiddleware, getTVShowById)
router.get('/:id/comments', getTVShowComments)

export default router
