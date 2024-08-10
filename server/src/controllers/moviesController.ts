import { Request, Response } from 'express'
import { fetchFromTMDB } from '../services/tmdbService'

export const getMovies = async (req: Request, res: Response) => {
  const { page, query } = req.query
  const pageNumber = Number(page) || 1

  let url = query
    ? `3/search/movie?query=${query}&page=${pageNumber}`
    : `3/discover/movie?page=${pageNumber}`

  try {
    let data = await fetchFromTMDB(url)
    data.results = data.results.map((result: any) => {
      return {
        ...result,
        type: 'movie',
      }
    })

    res.json(data)
  } catch (error) {
    console.error('Error fetching movies:', error)
    res.status(500).send('Internal Server Error')
  }
}
