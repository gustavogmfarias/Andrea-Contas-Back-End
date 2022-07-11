import { Cliente } from "@prisma/client";
import { IPaginationRequestDTO } from "@shared/dtos/IPaginationRequestDTO";
import { ICreateClienteDTO } from "../dtos/ICreateClienteDTO";
import { ICreateEnderecoDTO } from "../dtos/ICreateEnderecoDTO";

export interface IClientesRepository {
    create(
        data: ICreateClienteDTO,
        endereco: ICreateEnderecoDTO
    ): Promise<void>;
    delete(id: string): Promise<void>;
    listClientes(data: IPaginationRequestDTO): Promise<Cliente[] | null>;
    findByName(nome: string): Promise<Cliente[] | null>;
    findById(id: string): Promise<Cliente | null>;
    findByCpf(cpf: string): Promise<Cliente | null>;
    update(data: ICreateClienteDTO): Promise<void>;
}
