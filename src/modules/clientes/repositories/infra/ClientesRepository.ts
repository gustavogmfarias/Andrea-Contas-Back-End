import { ICreateEnderecoDTO } from "@modules/clientes/dtos/ICreateEnderecoDTO";
import { Cliente, Endereco } from "@prisma/client";
import { prisma } from "../../../../shared/database/prismaClient";
import { IPaginationRequestDTO } from "../../../../shared/dtos/IPaginationRequestDTO";
import { ICreateClienteDTO } from "../../dtos/ICreateClienteDTO";
import { IClientesRepository } from "../IClientesRepository";

export class ClientesRepository implements IClientesRepository {
    async create(
        {
            nome,
            sobrenome,
            cpf,
            email,
            telefone,
            observacoes,
            avatarUrl,
        }: ICreateClienteDTO,
        { bairro, rua, cep, cidade, estado, numero }: ICreateEnderecoDTO
    ): Promise<void> {
        const endereco = await prisma.endereco.create({
            data: { bairro, rua, cep, cidade, estado, numero },
        });

        await prisma.cliente.create({
            data: {
                nome,
                sobrenome,
                cpf,
                email,
                telefone,
                observacoes,
                fk_id_endereco: endereco.id,
                avatarUrl,
            },
        });
    }

    async delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async listClientes({
        page,
        per_page,
    }: IPaginationRequestDTO): Promise<Cliente[] | null> {
        throw new Error("Method not implemented.");
    }

    async findByName(nome: string): Promise<Cliente[] | null> {
        throw new Error("Method not implemented.");
    }

    async findById(id: string): Promise<Cliente | null> {
        throw new Error("Method not implemented.");
    }

    findByCpf(cpf: string): Promise<Cliente> {
        throw new Error("Method not implemented.");
    }

    async update(data: ICreateClienteDTO): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
