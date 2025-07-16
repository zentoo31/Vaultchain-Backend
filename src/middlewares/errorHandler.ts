import { Request, Response, NextFunction } from "express";

export function errorHandler(
    err: any,
    req: Request,
    res: Response,
    _next: NextFunction
){
    console.error(err.startus);
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
    });
}