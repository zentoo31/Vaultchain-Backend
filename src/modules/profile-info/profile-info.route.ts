import { Router } from "express";
import { ProfileInfoController } from "./profile-info.controller";
import { authenticateToken } from "../../middlewares/auth";

const profileInfoRouter = Router();
const profileInfoController = new ProfileInfoController();

profileInfoRouter.get("/info", authenticateToken, profileInfoController.getProfile);

export default profileInfoRouter;