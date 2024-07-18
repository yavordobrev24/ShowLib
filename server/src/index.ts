import express, { Request, Response } from 'express'

import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
const PORT = process.env.PORT
const app = express()

app.use(cors())
app.use(express.json())

app.listen(PORT, () => {
  console.log('Server is running on', PORT)
})
