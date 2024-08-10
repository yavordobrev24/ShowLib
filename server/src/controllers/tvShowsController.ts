import { Request, Response } from 'express'
import { fetchFromTMDB } from '../services/tmdbService'

export const getTVShows = async (req: Request, res: Response) => {
  const { page, query } = req.query
  const pageNumber = Number(page) || 1
  
  let url = query
    ? `3/search/tv?query=${query}&page=${pageNumber}`
    : `3/discover/tv?page=${pageNumber}`

  try {
    let data = await fetchFromTMDB(url)
    data.results = data.results.map((result: any) => {
      return {
        ...result,
        type: 'tv-show',
      }
    })
    res.json(data)
  } catch (error) {
    console.error('Error fetching TV shows:', error)
    res.status(500).send('Internal Server Error')
  }
}

export const getPopularTVShows = async (req: Request, res: Response) => {
  const { page } = req.query
  const pageNumber = Number(page) || 1

  try {
    let data = await fetchFromTMDB(`3/tv/popular?page=${pageNumber}`)
    data.results = data.results.map((result: any) => {
      return {
        ...result,
        type: 'tv-show',
      }
    })
    res.json(data)
  } catch (error) {
    console.error('Error fetching trending TV shows:', error)
    res.status(500).send('Internal Server Error')
  }
}
