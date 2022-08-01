/* eslint-disable no-await-in-loop */
import { ICreateLojistaDTO } from "@modules/accounts/dtos/ICreateLojistaDTO";

import { Cliente, Lojista } from "@prisma/client";

import { ILojistasRepository } from "@modules/accounts/repositories/ILojistasRepository";

import { prisma } from "@shared/database/prismaClient";
import { IUpdateLojistaDTO } from "@modules/accounts/dtos/IUpdateLojistaDTO";

export class LojistasRepository implements ILojistasRepository {
    async create({
        username,
        senha,
        nome,
    }: ICreateLojistaDTO): Promise<Lojista> {
        const lojista = await prisma.lojista.create({
            data: {
                username,
                nome,
                senha,
            },
        });

        return lojista;
    }

    async update({
        username,
        senha,
        nome,
        id,
    }: IUpdateLojistaDTO): Promise<Lojista> {
        const lojista = await prisma.lojista.update({
            where: { id },
            data: {
                username,
                senha,
                nome,
            },
        });

        return lojista;
    }

    async changeOwnPassword({ senha, id }: IUpdateLojistaDTO): Promise<void> {
        await prisma.lojista.update({
            where: { id },
            data: {
                senha,
            },
        });
    }

    async listLojistas({ page, per_page }): Promise<Lojista[]> {
        let lojistas: Lojista[];

        if (!page || !per_page) {
            lojistas = await prisma.lojista.findMany({
                orderBy: {
                    id: "desc",
                },
            });
        } else {
            lojistas = await prisma.lojista.findMany({
                take: Number(per_page),
                skip: (Number(page) - 1) * Number(per_page),
                orderBy: {
                    id: "desc",
                },
            });
        }

        return lojistas;
    }

    async delete(id: string): Promise<void> {
        await prisma.lojista.delete({
            where: { id },
        });
    }

    async findById(id: string): Promise<Lojista | null> {
        const lojista = await prisma.lojista.findUnique({
            where: {
                id,
            },
        });

        return lojista;
    }

    async findByUserName(username: string): Promise<Lojista | null> {
        const lojista = await prisma.lojista.findFirst({
            where: {
                username,
            },
        });

        return lojista;
    }

    async avatarUrl(cliente: Cliente): Promise<string> {
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
