import { Router } from "express";
import { AuthController } from "./auth.controller";
import { catchAsync } from "../../middlewares/catchAsync";

const authRouter = Router();
const authController = new AuthController();

authRouter.post("/register", catchAsync(authController.register));

export default authRouter;