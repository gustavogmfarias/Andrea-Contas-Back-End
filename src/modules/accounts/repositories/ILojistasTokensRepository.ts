import { ICreateLojistaTokenDTO } from "@modules/accounts/dtos/ICreateLojistaTokenDTO";
import { LojistaToken } from "@prisma/client";

interface ILojistasTokensRepository {
    create({
        expiresDate,
        lojistaId,
        refreshToken,
    }: ICreateLojistaTokenDTO): Promise<LojistaToken>;

    findByLojistaIdAndRefreshToken(
        lojistaId: string,
        refreshToken: string
    ): Promise<LojistaToken>;

    deleteById(id: string): Promise<void>;

    findByRefreshToken(refreshToken: string): Promise<LojistaToken>;
}

export { ILojistasTokensRepository };
