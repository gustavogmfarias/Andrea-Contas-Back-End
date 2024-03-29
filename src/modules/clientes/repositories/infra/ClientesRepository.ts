import { ICreateEnderecoDTO } from "@modules/clientes/dtos/ICreateEnderecoDTO";
import { Cliente, Conta, Endereco } from "@prisma/client";
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
    ): Promise<Cliente> {
        const cliente = await prisma.cliente.create({
            data: {
                nome,
                sobrenome,
                cpf,
                email,
                telefone,
                observacoes,
                avatarUrl,
                endereco: {
                    create: {
                        bairro,
                        rua,
                        cep,
                        cidade,
                        estado,
                        numero,
                    },
                },
            },
        });

        return cliente;
    }

    async delete(id: string): Promise<void> {
        const cliente = await prisma.cliente.findUnique({ where: { id } });

        await prisma.endereco.delete({
            where: { id: cliente.fkIdEndereco },
        });
    }

    async listClientes({
        page,
        perPage,
    }: IPaginationRequestDTO): Promise<Cliente[] | null> {
        let clientes: Cliente[];

        if (!page || !perPage) {
            clientes = await prisma.cliente.findMany({
                orderBy: {
                    id: "desc",
                },
                include: { endereco: true, Conta: true },
            });
        } else {
            clientes = await prisma.cliente.findMany({
                take: Number(perPage),
                skip: (Number(page) - 1) * Number(perPage),
                orderBy: {
                    id: "desc",
                },
                include: { endereco: true },
            });
        }

        return clientes;
    }

    async findByName(
        nome: string,
        { page, perPage }: IPaginationRequestDTO
    ): Promise<Cliente[] | null> {
        let clientes: Cliente[];

        if (!page || !perPage) {
            clientes = await prisma.cliente.findMany({
                where: {
                    nome: {
                        contains: nome,
                        mode: "insensitive",
                    },
                },
                include: { endereco: true },
                orderBy: { nome: "desc" },
            });
        } else {
            clientes = await prisma.cliente.findMany({
                where: {
                    nome: {
                        contains: nome,
                        mode: "insensitive",
                    },
                },
                include: { endereco: true },
                orderBy: { nome: "desc" },
                take: Number(perPage),
                skip: (Number(page) - 1) * Number(perPage),
            });
        }

        return clientes;
    }

    async findClienteContaAtiva(id: string): Promise<Conta | null> {
        const conta = await prisma.conta.findFirst({
            where: {
                fkIdCliente: id,
                ativo: true,
            },
        });

        return conta;
    }

    async findById(id: string): Promise<Cliente | null> {
        const cliente = await prisma.cliente.findUnique({
            where: {
                id,
            },
        });

        return cliente;
    }

    async findByCpf(cpf: string): Promise<Cliente> {
        const cliente = await prisma.cliente.findUnique({
            where: {
                cpf,
            },
        });

        return cliente;
    }

    async findEnderecoById(id: string): Promise<Endereco> {
        const endereco = await prisma.endereco.findUnique({
            where: {
                id,
            },
        });

        return endereco;
    }

    async update(
        {
            id,
            nome,
            sobrenome,
            cpf,
            email,
            telefone,
            observacoes,
            avatarUrl,
        }: ICreateClienteDTO,
        { rua, bairro, numero, cidade, estado, cep }: ICreateEnderecoDTO
    ): Promise<Cliente> {
        const cliente = await prisma.cliente.update({
            where: { id },
            data: {
                nome,
                sobrenome,
                cpf,
                email,
                telefone,
                observacoes,
                editadoEm: new Date(),
                avatarUrl,
            },
        });

        await prisma.endereco.update({
            where: { id: cliente.fkIdEndereco },
            data: { rua, bairro, numero, cidade, estado, cep },
        });

        return cliente;
    }

    avatarUrl(cliente: Cliente): string {
        switch (process.env.DISK) {
            case "local":
                return `${process.env.APP_API_URL}/avatar/${cliente.avatarUrl}`;
            case "s3":
                return `${process.env.AWS_BUCKET_URL}/avatar/${cliente.avatarUrl}`;
            default:
                return null;
        }
    }
}
