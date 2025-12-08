import { Request, Response, NextFunction } from "express";
import { AppError } from "../../../application/errors/AppError";

export function errorHandler(
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) {
    // Known AppError (domain/application)
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: "error",
            message: err.message
        });
    }

    // Unexpected error
    console.error("Unhandled Error:", err);

    return res.status(500).json({
        status: "error",
        message: "Internal server error"
    });
}
