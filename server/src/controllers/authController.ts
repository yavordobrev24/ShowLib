import { Request, Response } from 'express'
import { AppDataSource } from '../data-source'
import { User } from '../entity/User'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const userRepository = AppDataSource.getRepository(User)
const { JWT_SECRET } = process.env

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const user = await userRepository.findOneBy({ email })
    if (!user) {
      return res.status(401).send('Wrong email or password!')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).send('Wrong email or password!')
    }

    const accessToken = jwt.sign(
      { id: user.id, email: user.email, username: user.username },
      JWT_SECRET as string,
      { expiresIn: '30m' }
    )

    res.cookie('accessToken', accessToken, { httpOnly: true })
    res.send({
      id: user.id,
      email: user.email,
      username: user.username,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const register = async (req: Request, res: Response) => {
  const { email, username, password } = req.body

  try {
    const existingUser = await userRepository.findOne({
      where: [
        {
          email,
        },
        {
          username,
        },
      ],
    })

    if (existingUser) {
      return res.status(409).send('Account already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = userRepository.create({
      email,
      username,
      password: hashedPassword,
    })
    const results = await userRepository.save(newUser)

    const accessToken = jwt.sign(
      { id: results.id, email: results.email, username: results.username },
      JWT_SECRET as string,
      { expiresIn: '30m' }
    )

    res.cookie('accessToken', accessToken, { httpOnly: true })
    res.send({
      id: results.id,
      email: results.email,
      username: results.username,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie('accessToken')
    res.json('Successfully logged out')
  } catch (error) {
    console.error(error)
    res.clearCookie('accessToken')
    res.status(500).json({ message: 'Internal server error' })
  }
}
