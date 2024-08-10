import { Router } from 'express'
import {
  addFavourite,
  deleteFavourite,
  getFavourite,
} from '../controllers/favouritesController'
import authMiddleware from '../middlewares/authMiddleware'

const router = Router()
export default router
