import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./modules/auth/auth.route";
import morgan from "morgan";
import profileInfoRouter from "./modules/profile-info/profile-info.route";
import { errorHandler } from "./middlewares/errorHandler";
import { rateLimiter } from "./middlewares/rateLimiter";
import { corsOptions } from "./config/corsOptions";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(rateLimiter);
app.use(morgan("dev"));

app.use("/auth", authRouter);
app.use("/profile", profileInfoRouter);

app.use(errorHandler);
export default app;