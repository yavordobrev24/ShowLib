import { Request, Response } from 'express'
import { AppDataSource } from '../data-source'
import { Comment } from '../entity/Comment'

const commentRepository = AppDataSource.getRepository(Comment)

export const addComment = async (req: Request, res: Response) => {
  const { content, user_id, user_name, media_id, media_type } = req.body

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
export const editComment = async (req: Request, res: Response) => {
  const { id } = req.params
  const { content, user_name, user_id, media_id, media_type } = req.body
  try {
    const results = await commentRepository.update(id, {
      id: Number(id),
      content,
      user_name,
      user_id,
      media_id,
      media_type,
    })

    res.json(results)
  } catch (error) {
    console.error('Error fetching trending movies:', error)
    res.status(500).send('Internal Server Error')
  }
}
