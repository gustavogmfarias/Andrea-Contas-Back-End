import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserToken } from "@prisma/client";

interface IUsersTokensRepository {
    create({
        expires_date,
        user_id,
        refresh_token,
    }: ICreateUserTokenDTO): Promise<UserToken>;

    findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string
    ): Promise<UserToken>;

    deleteById(id: string): Promise<void>;

    findByRefreshToken(refresh_token: string): Promise<UserToken>;
}

export { IUsersTokensRepository };
