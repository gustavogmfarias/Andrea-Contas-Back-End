import { ICreateLojistaTokenDTO } from "@modules/accounts/dtos/ICreateLojistaTokenDTO";
import { ILojistasTokensRepository } from "@modules/accounts/repositories/ILojistasTokensRepository";
import { LojistaToken } from "@prisma/client";
import { prisma } from "@shared/database/prismaClient";

class LojistasTokensRepository implements ILojistasTokensRepository {
    async create({
        expiresDate,
        lojistaId,
        refreshToken,
        token,
    }: ICreateLojistaTokenDTO): Promise<LojistaToken> {
        try {
            const lojistaToken = await prisma.lojistaToken.create({
                data: { expiresDate, lojistaId, refreshToken, token },
            });

            return lojistaToken;
        } catch (err) {
            return err.message;
        }
    }

    async findByLojistaIdAndRefreshToken(
        lojistaId: string,
        refreshToken: string
    ): Promise<LojistaToken> {
        const lojistaTokens = await prisma.lojistaToken.findFirst({
            where: { lojistaId, refreshToken },
        });

        return lojistaTokens;
    }

    async deleteById(id: string): Promise<void> {
        await prisma.lojistaToken.delete({ where: { id } });
    }

    async findByRefreshToken(refreshToken: string): Promise<LojistaToken> {
        const lojistaToken = await prisma.lojistaToken.findFirst({
            where: { refreshToken },
        });
        return lojistaToken;
    }
}

export { LojistasTokensRepository };
