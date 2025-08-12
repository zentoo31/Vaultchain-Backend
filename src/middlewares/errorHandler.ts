import { Request, Response, NextFunction } from "express";
import { HttpError } from "../utils/http.errors";
export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error(err.stack);
    
    if (err instanceof HttpError) {
        return res.status(err.statusCode).json({ error: err.message });
    }
    
    res.status(500).json({ error: "Internal server error" });
}