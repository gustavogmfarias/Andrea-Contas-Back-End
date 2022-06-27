import { ICreateLojistaTokenDTO } from "@modules/accounts/dtos/ICreateLojistaTokenDTO";
import { LojistaToken } from "@prisma/client";

interface ILojistasTokensRepository {
    create({
        expires_date,
        lojista_id,
        refresh_token,
    }: ICreateLojistaTokenDTO): Promise<LojistaToken>;

    findByLojistaIdAndRefreshToken(
        lojista_id: string,
        refresh_token: string
    ): Promise<LojistaToken>;

    deleteById(id: string): Promise<void>;

    findByRefreshToken(refresh_token: string): Promise<LojistaToken>;
}

export { ILojistasTokensRepository };
