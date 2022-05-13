import { NextFunction, Request, Response } from "express";
import { UsersRepository } from "@modules/accounts/repositories/infra/UsersRepository";
import { AppError } from "@shared/errors/AppError";

export async function ensureAdmin(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const { id } = request.user;
    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(id);

    if (user.role !== "ADMIN") {
        throw new AppError("User is not an Admin!");
    }

    return next();
}
