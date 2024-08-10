import { Router } from 'express'
import {
  addFavourite,
  deleteFavourite,
  getFavourite,
} from '../controllers/favouritesController'
import authMiddleware from '../middlewares/authMiddleware'

const router = Router()

router.get('/', authMiddleware, getFavourite)
router.post('/', authMiddleware, addFavourite)
router.delete('/', authMiddleware, deleteFavourite)

export default router
