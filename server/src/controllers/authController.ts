import { Request, Response } from 'express'
import { AppDataSource } from '../data-source'
import { User } from '../entity/User'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const userRepository = AppDataSource.getRepository(User)
const { JWT_SECRET } = process.env

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body
export const register = async (req: Request, res: Response) => {
  const { email, username, password } = req.body
}
export const logout = async (req: Request, res: Response) => {
}
