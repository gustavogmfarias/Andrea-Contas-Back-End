import { Cliente, Endereco } from "@prisma/client";
import { IPaginationRequestDTO } from "@shared/dtos/IPaginationRequestDTO";
import { ICreateClienteDTO } from "../dtos/ICreateClienteDTO";
import { ICreateEnderecoDTO } from "../dtos/ICreateEnderecoDTO";

export interface IClientesRepository {
    create(
        data: ICreateClienteDTO,
        endereco: ICreateEnderecoDTO
    ): Promise<Lojista>;
    delete(id: string): Promise<void>;
    listClientes(data: IPaginationRequestDTO): Promise<Cliente[] | null>;
    findByName(
        nome: string,
        { page, per_page }: IPaginationRequestDTO
    ): Promise<Cliente[] | null>;
    findById(id: string): Promise<Cliente | null>;
    findByCpf(cpf: string): Promise<Cliente | null>;
    update(
        data?: ICreateClienteDTO,
        endereco?: ICreateEnderecoDTO
    ): Promise<Cliente>;

    avatarUrl(cliente: Cliente): string;
    findEnderecoById(id: string): Promise<Endereco | null>;
}
