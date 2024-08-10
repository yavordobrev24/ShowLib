import express, { Request, Response } from 'express'
import { AppDataSource } from './data-source'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import cors from 'cors'

import moviesRoutes from './routes/moviesRoutes'
import tvShowsRoutes from './routes/tvShowsRoutes'
import authRoutes from './routes/authRoutes'
import favouritesRoutes from './routes/favouritesRoutes'
import commentsRoutes from './routes/commentsRoutes'

const { PORT } = process.env
const app = express()

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!')
  })
  .catch((error) => {
    console.error('Error during Data Source initialization:', error)
  })
const corsOptions = {
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use('/api/movies', moviesRoutes)
app.use('/api/tv-shows', tvShowsRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/favourites', favouritesRoutes)
app.use('/api/comments', commentsRoutes)

app.listen(PORT || 3000)
