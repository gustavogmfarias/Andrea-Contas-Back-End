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
    refreshToken: string;
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
            auth.secret_refreshToken
        ) as IPayload;
        const lojistaId = sub;

        const lojistaToken =
            await this.lojistasTokensRepository.findByLojistaIdAndRefreshToken(
                lojistaId,
                token
            );

        if (!lojistaToken) {
            throw new AppError("Refresh Token doesn't Exists", 401);
        }

        await this.lojistasTokensRepository.deleteById(lojistaToken.id);

        const expiresDate = this.dateProvider.addDays(
            auth.expires_in_refresh_days
        );

        const refreshToken = sign({ username }, auth.secret_refreshToken, {
            subject: sub,
            expiresIn: auth.expires_in_refreshToken,
        });

        await this.lojistasTokensRepository.create({
            expiresDate,
            refreshToken,
            lojistaId,
            token,
        });

        const newToken = sign({ username }, auth.secret_token, {
            subject: lojistaId,
            expiresIn: auth.expires_in_token,
        });

        return { refreshToken, token: newToken };
    }
}

export { RefreshTokenUseCase };
