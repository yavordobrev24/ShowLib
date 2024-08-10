import 'reflect-metadata'
import { DataSource } from 'typeorm'

import 'dotenv/config'
import { Comment } from './entity/Comment'
import { Favourite } from './entity/Favourite'
import { User } from './entity/User'
const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Comment, Favourite],
  migrations: [],
  subscribers: [],
})
