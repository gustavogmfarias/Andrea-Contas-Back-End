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

    async delete(cpf: string): Promise<void> {
        const cliente = await prisma.cliente.findFirst({ where: { cpf } });

        await prisma.endereco.delete({
            where: { id: cliente.fk_id_endereco },
        });
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

    async findByCpf(cpf: string): Promise<Cliente> {
        const cliente = await prisma.cliente.findFirst({
            where: {
                cpf,
            },
        });

        return cliente;
    }

    async update(data: ICreateClienteDTO): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
