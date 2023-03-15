import { NextFunction, Request, Response } from 'express'
import config from "config";
import redisClient from '@utils/connectRedis'

const redisKey = config.get<string>('tokenKey');

export const getCached = async (req:Request, res:Response, next:NextFunction) => {
    try {
      const value = await redisClient.get(redisKey)
      if (value) {
        res.locals.account = value
        next()
      } else {
        next()
      }
    } catch (error) {
        console.log("redis error", error)
        next()
    }
}

export const caching = async (key:string, data:object) => {
    try {
        await redisClient.set(key, JSON.stringify(data))
    } catch (error) {
        console.log(error)
    }
    
}

export const delCache = async (key:string) => {
    try {
        await redisClient.del(key)
    } catch (error) {
        console.log(error)
    }
}