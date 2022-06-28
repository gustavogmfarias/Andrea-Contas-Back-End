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
    refresh_token: string;
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
            expires_in_token,
            secret_refresh_token,
            secret_token,
            expires_in_refresh_token,
            expires_in_refresh_days,
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
        const token = sign({ username }, secret_token, {
            subject: lojista.id,
            expiresIn: expires_in_token,
        });

        const refresh_token = sign({ username }, secret_refresh_token, {
            subject: lojista.id,
            expiresIn: expires_in_refresh_token,
        });

        const refresh_token_expires_date = this.dateProvider.addDays(
            expires_in_refresh_days
        );

        this.lojistasTokensRepository.create({
            expires_date: refresh_token_expires_date,
            refresh_token,
            lojista_id: lojista.id,
            token,
        });

        const tokenReturn: IResponse = {
            token,
            lojista: {
                nome: lojista.nome,
                username: lojista.username,
            },
            refresh_token,
        };

        return tokenReturn;
    }
}

export { AuthenticateLojistaUseCase };
