import {
  createUserHandler,
  getUserByAccountNumberHandler,
  getUserByRegistrationNumberHandler,
  getUserByLastLogin,
  getAllUser,
  deleteAllUser,
  login,
} from "@controllers/user.controller";
import { RegisterDto } from "@dtos/auth.dto";
import { dtoValidation } from "@middleware/dtoValidation";
import { verifyToken } from "@middleware/jwt";
import express from "express";

const router = express.Router();

router.route("/register").post(dtoValidation(RegisterDto), createUserHandler);

router.route("/login").post(dtoValidation(RegisterDto), login);

router.route("/all").get(getAllUser);
router.route("/delete-all").get(deleteAllUser);

router
  .route("/accountNumber/:accountNumber")
  .get(verifyToken, getUserByAccountNumberHandler);

router
  .route("/registrationNumber/:registrationNumber")
  .get(verifyToken, getUserByRegistrationNumberHandler);

router
  .route("/lastLogin")
  .get(verifyToken, getUserByLastLogin);

export default router;
