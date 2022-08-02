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
            auth.secretRefreshToken
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
            auth.expiresInRefreshDays
        );

        const refreshToken = sign({ username }, auth.secretRefreshToken, {
            subject: sub,
            expiresIn: auth.expiresInRefreshToken,
        });

        await this.lojistasTokensRepository.create({
            expiresDate,
            refreshToken,
            lojistaId,
            token,
        });

        const newToken = sign({ username }, auth.secretToken, {
            subject: lojistaId,
            expiresIn: auth.expiresInToken,
        });

        return { refreshToken, token: newToken };
    }
}

export { RefreshTokenUseCase };
