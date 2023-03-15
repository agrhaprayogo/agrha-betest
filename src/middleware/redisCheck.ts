import { NextFunction, Request, Response } from 'express'
import { AccountServices } from "@services/account.services";

const accountServices = new AccountServices();


export const getCached = (req:Request, res:Response, next:NextFunction) => {
    try {
       
    } catch (error) {
        
    }
}