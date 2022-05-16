import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { UserToken } from "@prisma/client";
import { prisma } from "@shared/database/prismaClient";

class UsersTokensRepository implements IUsersTokensRepository {
    async create({
        expires_date,
        user_id,
        refresh_token,
        token,
    }: ICreateUserTokenDTO): Promise<UserToken> {
        const userToken = await prisma.userToken.create({
            data: { expires_date, user_id, refresh_token, token },
        });

        return userToken;
    }

    async findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string
    ): Promise<UserToken> {
        const userTokens = await prisma.userToken.findFirst({
            where: { user_id, refresh_token },
        });

        return userTokens;
    }

    async deleteById(id: string): Promise<void> {
        prisma.userToken.delete({ where: { id } });
    }

    async findByRefreshToken(refresh_token: string): Promise<UserToken> {
        const userToken = await prisma.userToken.findFirst({
            where: { refresh_token },
        });
        return userToken;
    }
}

export { UsersTokensRepository };
