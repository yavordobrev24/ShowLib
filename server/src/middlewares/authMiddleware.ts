import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

interface AuthenticatedRequest extends Request {
  user?: jwt.JwtPayload
}

const { JWT_SECRET } = process.env

const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies.accessToken

  if (!accessToken) {
    return res.status(401).json({ message: 'No access token provided' })
  }

  try {
    const user = jwt.verify(accessToken, JWT_SECRET as string) as jwt.JwtPayload
    req.user = user
    next()
  } catch (error) {
    console.error(error)
    res.clearCookie('accessToken')
    res.status(401).json({ message: 'Invalid or expired token' })
  }
}

export default authMiddleware
