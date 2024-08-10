import { Router } from 'express'

import {
  addComment,
  deleteComment,
  editComment,
} from '../controllers/commentsController'
import authMiddleware from '../middlewares/authMiddleware'

const router = Router()

router.post('/', authMiddleware, addComment)
router.delete('/:id', authMiddleware, deleteComment)
router.put('/:id', authMiddleware, editComment)

export default router
