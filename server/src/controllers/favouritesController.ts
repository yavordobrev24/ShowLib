import { Request, Response } from 'express'
import { AppDataSource } from '../data-source'
import { Favourite } from '../entity/Favourite'

const favouriteRepository = AppDataSource.getRepository(Favourite)

export const addFavourite = async (req: Request, res: Response) => {
  const { media_id, media_type, user_id, media_poster, media_title } = req.body

  try {
    const newFavourite = await favouriteRepository.create({
      media_id,
      media_type,
      user_id,
      media_poster,
      media_title,
    })
    const results = await favouriteRepository.save(newFavourite)
    res.json(results)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
