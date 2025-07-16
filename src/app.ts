import express from "express";
import { PORT } from "./config/constants";
import authRouter from "./modules/auth/auth.route";
import { errorHandler } from "./middlewares/errorHandler";
import { rateLimiter } from "./middlewares/rateLimiter";

const app = express();
app.use(express.json());
app.use(rateLimiter);

app.use("/auth", authRouter);

app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});