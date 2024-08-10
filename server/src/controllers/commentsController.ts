import { Request, Response } from 'express'
import { AppDataSource } from '../data-source'
import { Comment } from '../entity/Comment'

const commentRepository = AppDataSource.getRepository(Comment)

export const addComment = async (req: Request, res: Response) => {
  const { content, user_id, user_name, media_id, media_type } = req.body
  console.log('addComment body ', req.body)

  try {
    const newComment = await commentRepository.create({
      content,
      user_id,
      user_name,
      media_id,
      media_type,
    })
    const results = await commentRepository.save(newComment)

    res.json(results)
  } catch (error) {
    console.error('Error fetching trending movies:', error)
    res.status(500).send('Internal Server Error')
  }
}
