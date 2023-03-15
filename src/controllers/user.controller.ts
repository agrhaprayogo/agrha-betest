import { ErrorWithCode } from "../types/error";
import { NextFunction, Request, Response } from "express";
import { UserDto } from "@dtos/user.dto";
import { AccountDto } from "@dtos/account.dto";
import { UserServices } from "@services/user.services";
import { AccountServices } from "@services/account.services";
import AppError from "@utils/appError";
import { runInTransaction } from "typeorm-transactional";
import { RegisterDto } from "@dtos/auth.dto";
import jwt from "jsonwebtoken"
import uuid from "@utils/uuid";
import config from "config";
const bcrypt = require('bcrypt')

const saltRounds = 10;

const userServices = new UserServices();
const accountServices = new AccountServices();

export const createUserHandler = async (
  req: Request<object, object, RegisterDto>,
  res: Response,
  next: NextFunction
) => {
  try {
    await runInTransaction(async () => {
      const newUuid = uuid();
      const newUser = new UserDto();
      const timeElapsed = Date.now();
      const today = new Date(timeElapsed);
      newUser.userId = newUuid;
      newUser.accountNumber = req.body.accountNumber;
      newUser.fullName = req.body.fullName;
      newUser.registrationNumber = req.body.registrationNumber;
      newUser.emailAddress = req.body.emailAddress;
      const newAccount = new AccountDto();
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(req.body.password, salt);
      newAccount.userName = req.body.userName;
      newAccount.password = hash;
      newAccount.userId = newUuid;
      newAccount.lastLoginDate = today.toLocaleString();

      const user = await userServices.createUser(newUser);
      const account = await accountServices.createAccount(newAccount);

      res.status(201).json({
        status: "success",
        data: {
          user,
          account
        },
      });
    });
  } catch (err) {
    if ((err as ErrorWithCode).code === "23505") {
      return res.status(409).json({
        status: "fail",
        message: "User already exist",
      });
    }
    next(err);
  }
};

export const getUserByAccountNumberHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userServices.findUsersByAccountNumber(
      req.params.accountNumber
    );
    if (users.length == 0) {
      return next(
        new AppError(404, "User profile with that account number not found")
      );
    }

    res.status(200).json({
      status: "success",
      data: {
        users,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getAllUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userServices.findAllUsers();
    if (users.length == 0) {
      return next(
        new AppError(404, "User profile with that account number not found")
      );
    }

    res.status(200).json({
      status: "success",
      data: {
        users,
      },
    });
  } catch (err) {
    next(err);
  }
}

export const deleteAllUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deleted = await userServices.deleteAllUsers();
    if (deleted) {
      return next(
        new AppError(404, "User profile with that account number not found")
      );
    }

    res.status(200).json({
      status: "success",
      data: {
        deleted,
      },
    });
  } catch (err) {
    next(err);
  }
}

export const getUserByRegistrationNumberHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userServices.findUsersByRegistrationNumber(
      req.params.registrationNumber
    );
    if (users.length == 0) {
      return next(
        new AppError(
          404,
          "User profile with that registration number not found"
        )
      );
    }

    res.status(200).json({
      status: "success",
      data: {
        users,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getUserByLastLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accounts = await accountServices.findAccountByLastLoginDate();
    if (accounts.length == 0) {
      return next(
        new AppError(
          404,
          "Account profile not found"
        )
      );
    }
    let userIds = []
    for (let i = 0; i < accounts.length; i++) {
      userIds.push(accounts[i].userId)
    }
    const users = await userServices.findManyUsersByUserIds(userIds);
    if (users.length == 0) {
      return next(
        new AppError(
          404,
          "User profile not found"
        )
      );
    }

    res.status(200).json({
      status: "success",
      data: {
        users,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request<object, object, RegisterDto>,
  res: Response,
  next: NextFunction
) => {
  try {
    const account = await accountServices.findAccountByUsername(req.body.userName);
    if (account.length != 1) {
      return next(
        new AppError(404, "Account profile with that username is not found")
      );
    }
    let token 
    const tokenKey = config.get<string>('tokenKey');
    const match = await bcrypt.compare(req.body.password, account[0].password);
    if(match) {
      token = jwt.sign({ userId: account[0].userId }, tokenKey)
      res.status(200).json({
        status: "success",
        data: {
          token
        },
      });
    } else {
      return next(
        new AppError(404, "Password did not match")
      );
    }
  } catch (err) {
    next(err);
  }
};

