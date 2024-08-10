import { Router } from 'express'

import {
  getMovies,
  getPopularMovies,
  getMovieById,
} from '../controllers/moviesController'
import cacheMiddleware from '../middlewares/cacheMiddleware'
import { getMovieComments } from '../controllers/commentsController'

const router = Router()
export default router
