import { ICreateLojistaTokenDTO } from "@modules/accounts/dtos/ICreateLojistaTokenDTO";
import { ILojistasTokensRepository } from "@modules/accounts/repositories/ILojistasTokensRepository";
import { LojistaToken } from "@prisma/client";
import { prisma } from "@shared/database/prismaClient";

class LojistasTokensRepository implements ILojistasTokensRepository {
    async create({
        expires_date,
        lojista_id,
        refresh_token,
        token,
    }: ICreateLojistaTokenDTO): Promise<LojistaToken> {
        const lojistaToken = await prisma.lojistaToken.create({
            data: { expires_date, lojista_id, refresh_token, token },
        });

        return lojistaToken;
    }

    async findByLojistaIdAndRefreshToken(
        lojista_id: string,
        refresh_token: string
    ): Promise<LojistaToken> {
        const lojistaTokens = await prisma.lojistaToken.findFirst({
            where: { lojista_id, refresh_token },
        });

        return lojistaTokens;
    }

    async deleteById(id: string): Promise<void> {
        await prisma.lojistaToken.delete({ where: { id } });
    }

    async findByRefreshToken(refresh_token: string): Promise<LojistaToken> {
        const lojistaToken = await prisma.lojistaToken.findFirst({
            where: { refresh_token },
        });
        return lojistaToken;
    }
}

export { LojistasTokensRepository };
