import express, { Request, Response } from 'express'
import { AppDataSource } from './data-source'
import 'dotenv/config'
import { cacheMiddleware } from './middlewares/cacheMiddleware'

const { PORT, TMDB_API_KEY, TMDB_API_URL } = process.env
const app = express()

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!')
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err)
  })

app.use(express.json())

app.get('/api/movies', cacheMiddleware, async (req: Request, res: Response) => {
  console.log('Full Request!')

  try {
    const response = await fetch(`${TMDB_API_URL}/3/discover/movie`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TMDB_API_KEY}`,
      },
    })

    const data = await response.json()
    console.log(data)
    res.json(data)
  } catch (err) {
    console.log(err)
    res.status(500).send('Internal Server Error')
  }
})

app.listen(PORT || 3000)
