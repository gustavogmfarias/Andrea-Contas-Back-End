import express, { NextFunction, Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { router } from "./routes";

const app = express();

app.use(express.json());

app.use(router);

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof AppError) {
            return response
                .status(err.statusCode)
                .json({ message: err.message });
        }

        return response.status(500).json({
            status: "error",
            message: `Internal Server Error - ${err.message}`,
        });
    }
);

export { app };
