import { Router } from 'express'

import {
  getMovies,
  getPopularMovies,
  getMovieById,
} from '../controllers/moviesController'
import cacheMiddleware from '../middlewares/cacheMiddleware'
import { getMovieComments } from '../controllers/commentsController'

const router = Router()

router.get('/', cacheMiddleware, getMovies)
router.get('/popular', cacheMiddleware, getPopularMovies)
router.get('/:id', cacheMiddleware, getMovieById)
router.get('/:id/comments', getMovieComments)

export default router
