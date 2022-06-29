import { inject, injectable } from "tsyringe";

import { verify, sign } from "jsonwebtoken";

import { ILojistasTokensRepository } from "@modules/accounts/repositories/ILojistasTokensRepository";
import auth from "@config/auth";
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IPayload {
    sub: string;
    username: string;
}

interface ITokenResponse {
    token: string;
    refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
    constructor(
        @inject("LojistasTokensRepository")
        private lojistasTokensRepository: ILojistasTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) {}

    async execute(token: string): Promise<ITokenResponse> {
        const { username, sub } = verify(
            token,
            auth.secret_refresh_token
        ) as IPayload;
        const lojista_id = sub;

        const lojistaToken =
            await this.lojistasTokensRepository.findByLojistaIdAndRefreshToken(
                lojista_id,
                token
            );

        if (!lojistaToken) {
            throw new AppError("Refresh Token doesn't Exists", 401);
        }

        await this.lojistasTokensRepository.deleteById(lojistaToken.id);

        const expires_date = this.dateProvider.addDays(
            auth.expires_in_refresh_days
        );

        const refresh_token = sign({ username }, auth.secret_refresh_token, {
            subject: sub,
            expiresIn: auth.expires_in_refresh_token,
        });

        await this.lojistasTokensRepository.create({
            expires_date,
            refresh_token,
            lojista_id,
            token,
        });

        const newToken = sign({ username }, auth.secret_token, {
            subject: lojista_id,
            expiresIn: auth.expires_in_token,
        });

        return { refresh_token, token: newToken };
    }
}

export { RefreshTokenUseCase };
