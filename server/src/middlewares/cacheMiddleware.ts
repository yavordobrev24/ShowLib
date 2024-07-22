import { NextFunction, Request, Response } from 'express'
import NodeCache from 'node-cache'

const cache = new NodeCache({ checkperiod: 60 * 60 * 24, maxKeys: 100 })

const cacheMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.method !== 'GET') {
    console.log('Cannot cache non-GET methods')
    return next()
  }
  const key = req.originalUrl

  const cachedRes = cache.get(key)
  if (cachedRes) {
    console.log('Cache Hit!')
    return res.json(cachedRes)
  } else {
    console.log('Cache Miss')
    const originalJson = res.json.bind(res)

    res.json = (body: any): Response<any, Record<string, any>> => {
      cache.set(key, body, 60 * 60 * 24)
      return originalJson(body)
    }
    next()
  }
}
export default cacheMiddleware
