import { Router } from "express";
import { AuthController } from "./auth.controller";
import { catchAsync } from "../../middlewares/catchAsync";
import { authenticateToken } from "../../middlewares/auth";

const authRouter = Router();
const authController = new AuthController();

authRouter.post("/register", catchAsync(authController.register));
authRouter.post("/login", catchAsync(authController.login));
authRouter.get("/verify-token", authenticateToken , catchAsync(authController.verifyToken))
authRouter.post("/logout", catchAsync(authController.logout));

export default authRouter;