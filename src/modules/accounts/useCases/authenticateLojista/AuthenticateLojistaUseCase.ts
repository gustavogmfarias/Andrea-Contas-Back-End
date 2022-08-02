import { inject, injectable } from "tsyringe";
import "reflect-metadata";
import { ILojistasRepository } from "@modules/accounts/repositories/ILojistasRepository";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { AppError } from "@shared/errors/AppError";
import { ILojistasTokensRepository } from "@modules/accounts/repositories/ILojistasTokensRepository";
import auth from "@config/auth";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IRequest {
    username: string;
    senha: string;
}

interface IResponse {
    lojista: { nome: string; username: string };
    token: string;
    refreshToken: string;
}

@injectable()
class AuthenticateLojistaUseCase {
    constructor(
        @inject("LojistasRepository")
        private lojistasRepository: ILojistasRepository,
        @inject("LojistasTokensRepository")
        private lojistasTokensRepository: ILojistasTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) {}

    async execute({ username, senha }: IRequest): Promise<IResponse> {
        // verificar se o usuario existe
        const lojista = await this.lojistasRepository.findByUserName(username);
        const {
            expiresInToken,
            secretRefreshToken,
            secretToken,
            expiresInRefreshToken,
            expiresInRefreshDays,
        } = auth;

        if (!lojista) {
            throw new AppError("Email or password incorrect", 401);
        }

        // senha está correta?
        const passwordMatch = await compare(senha, lojista.senha);

        if (!passwordMatch) {
            throw new AppError("Email or password incorrect", 401);
        }

        // gerar jswonwebtoken
        const token = sign({ username }, secretToken, {
            subject: lojista.id,
            expiresIn: expiresInToken,
        });

        const refreshToken = sign({ username }, secretRefreshToken, {
            subject: lojista.id,
            expiresIn: expiresInRefreshToken,
        });

        const refreshTokenExpiresDate =
            this.dateProvider.addDays(expiresInRefreshDays);

        this.lojistasTokensRepository.create({
            expiresDate: refreshTokenExpiresDate,
            refreshToken,
            lojistaId: lojista.id,
            token,
        });

        const tokenReturn: IResponse = {
            token,
            lojista: {
                nome: lojista.nome,
                username: lojista.username,
            },
            refreshToken,
        };

        return tokenReturn;
    }
}

export { AuthenticateLojistaUseCase };
