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

export const getPopularMovies = async (req: Request, res: Response) => {
  const { page } = req.query
  const pageNumber = Number(page) || 1

  try {
    let data = await fetchFromTMDB(`3/movie/popular?page=${pageNumber}`)
    data.results = data.results.map((result: any) => {
      return {
        ...result,
        type: 'tv-show',
      }
    })
    res.json(data)
  } catch (error) {
    console.error('Error fetching trending movies:', error)
    res.status(500).send('Internal Server Error')
  }
}

export const getMovieById = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const data = await fetchFromTMDB(`3/movie/${id}`)
    res.json(data)
  } catch (error) {
    console.error('Error fetching movie details:', error)
    res.status(500).send('Internal Server Error')
  }
}
