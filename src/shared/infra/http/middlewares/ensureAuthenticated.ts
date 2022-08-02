import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "@shared/errors/AppError";
import { LojistasTokensRepository } from "@modules/accounts/repositories/infra/LojistasTokensRepository";
import auth from "@config/auth";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token missing", 401);
    }

    // padrão token: bearer 156162sfafgd3
    const [, token] = authHeader.split(" ");
    // vai dividir o array da seguinte forma: [0] => bearer e [1] => 1516151650wdffwqfqw24. Dessa forma o [, token] ele vai pegar o segundo com a variavel token.

    try {
        const { sub: lojistaId } = verify(
            // o sub: lojistaId é só um alias
            token,
            auth.secret_token
        ) as IPayload;
        // vai ter um retorno como IPayload

        request.lojista = {
            id: lojistaId,
        };

        next();
    } catch {
        throw new AppError("Invalid Token", 401);
    }
}
