import { inject, injectable } from "tsyringe";
import "reflect-metadata";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { AppError } from "@shared/errors/AppError";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import auth from "@config/auth";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: { name: string; email: string; role: string };
    token: string;
    refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) {}

    async execute({ email, password }: IRequest): Promise<IResponse> {
        // verificar se o usuario existe
        const user = await this.usersRepository.findByEmail(email);
        const {
            expires_in_token,
            secret_refresh_token,
            secret_token,
            expires_in_refresh_token,
            expires_in_refresh_days,
        } = auth;

        if (!user) {
            throw new AppError("Email or password incorrect", 401);
        }

        // senha está correta?
        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError("Email or password incorrect", 401);
        }

        // gerar jswonwebtoken
        const token = sign({ email, role: user.role }, secret_token, {
            subject: user.id,
            expiresIn: expires_in_token,
        });

        const refresh_token = sign(
            { email, role: user.role },
            secret_refresh_token,
            {
                subject: user.id,
                expiresIn: expires_in_refresh_token,
            }
        );

        const refresh_token_expires_date = this.dateProvider.addDays(
            expires_in_refresh_days
        );

        this.usersTokensRepository.create({
            expires_date: refresh_token_expires_date,
            refresh_token,
            user_id: user.id,
            token,
        });

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
            },
            refresh_token,
        };

        return tokenReturn;
    }
}

export { AuthenticateUserUseCase };
