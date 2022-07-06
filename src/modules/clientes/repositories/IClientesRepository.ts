import { Cliente } from "@prisma/client";
import { IPaginationRequestDTO } from "@shared/dtos/IPaginationRequestDTO";
import { ICreateClienteDTO } from "../dtos/ICreateClienteDTO";

export interface IClientesRepository {
    create(data: ICreateClienteDTO): Promise<void>;
    delete(id: string): Promise<void>;
    listClientes(data: IPaginationRequestDTO): Promise<Cliente[] | null>;
    findByName(nome: string): Promise<Cliente[] | null>;
    findById(id: string): Promise<Cliente | null>;
    update(data: ICreateClienteDTO): Promise<void>;
}
