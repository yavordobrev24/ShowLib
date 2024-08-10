import { Router } from 'express'

import {
  addComment,
  deleteComment,
  editComment,
} from '../controllers/commentsController'
import authMiddleware from '../middlewares/authMiddleware'

const router = Router()
export default router
