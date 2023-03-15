import { NextFunction, Request, Response } from 'express'
import jwt from "jsonwebtoken"
import config from "config";
import { UserServices } from "@services/user.services";
const userServices = new UserServices();

export const verifyToken = async (req:Request, res:Response, next:NextFunction) => {
  let access_token
  if (res.locals.account) {
     let account = JSON.parse(res.locals.account)
     let user = await userServices.findUserByUserId(account.userId)
     if (user) {
      res.locals.user = user
      next()
     }
  }
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')) 
    {
      access_token = req.headers.authorization.split(' ')[1]
    } 

  if (!access_token) {
    return res.status(400).json({
      status: res.statusCode,
      message: 'Unauthorized Access'
    });
  }
  try {
    const key = config.get<string>('tokenKey');
    const verified = jwt.verify(access_token, key)
    res.locals.user = verified
    next()
  } catch (error) {
    return res.status(400).json({
      status: res.statusCode,
      message: 'Invalid Token'
    });
  }
}