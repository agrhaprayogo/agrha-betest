import { NextFunction, Request, Response } from 'express'

export const healthCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json({
      status: 'success',
      message: 'Ok',
    })
  } catch (err) {
    next(err)
  }
}
