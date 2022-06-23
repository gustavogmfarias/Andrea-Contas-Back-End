import { Lojista } from "@prisma/client";

import { ICreateLojistaDTO } from "@modules/accounts/dtos/ICreateLojistaDTO";
import { IUpdateLojistaDTO } from "../dtos/IUpdateLojistaDTO";
import { IPaginationRequestDTO } from "../dtos/IPaginationRequestDTO";

export interface ILojistasRepository {
    create(data: ICreateLojistaDTO): Promise<void>;
    delete(id: string): Promise<void>;
    listLojistas(data: IPaginationRequestDTO): Promise<Lojista[] | null>;
    findByEmail(email: string): Promise<Lojista | null>;
    findById(id: string): Promise<Lojista | null>;
    update(data: IUpdateLojistaDTO): Promise<void>;
    avatarUrl(user: Lojista): Promise<string>;
    changeOwnPassword(data: IUpdateLojistaDTO): Promise<void>;
}
