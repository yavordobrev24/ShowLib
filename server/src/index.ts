import express from 'express'
import { AppDataSource } from './data-source'
import 'dotenv/config'

const { PORT } = process.env
const app = express()

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!')
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err)
  })

app.use(express.json())

app.listen(PORT || 3000)
