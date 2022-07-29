import { Lojista } from "@prisma/client";
import { ICreateLojistaDTO } from "@modules/accounts/dtos/ICreateLojistaDTO";
import { IPaginationRequestDTO } from "@shared/dtos/IPaginationRequestDTO";
import { IUpdateLojistaDTO } from "../dtos/IUpdateLojistaDTO";

export interface ILojistasRepository {
    create(data: ICreateLojistaDTO): Promise<Lojista>;
    delete(id: string): Promise<void>;
    listLojistas(data: IPaginationRequestDTO): Promise<Lojista[] | null>;
    findByUserName(username: string): Promise<Lojista | null>;
    findById(id: string): Promise<Lojista | null>;
    update(data: IUpdateLojistaDTO): Promise<void>;
    changeOwnPassword(data: IUpdateLojistaDTO): Promise<void>;
}
