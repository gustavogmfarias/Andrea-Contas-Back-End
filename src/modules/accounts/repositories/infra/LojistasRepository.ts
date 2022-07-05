/* eslint-disable no-await-in-loop */
import { ICreateLojistaDTO } from "@modules/accounts/dtos/ICreateLojistaDTO";

import { Lojista } from "@prisma/client";

import { ILojistasRepository } from "@modules/accounts/repositories/ILojistasRepository";

import { prisma } from "@shared/database/prismaClient";
import { IUpdateLojistaDTO } from "@modules/accounts/dtos/IUpdateLojistaDTO";

export class LojistasRepository implements ILojistasRepository {
    async findByUserName(username: string): Promise<Lojista | null> {
        const lojista = await prisma.lojista.findFirst({
            where: {
                username,
            },
        });

        return lojista;
    }

    async findById(id: string): Promise<Lojista | null> {
        const lojista = await prisma.lojista.findUnique({
            where: {
                id,
            },
        });

        return lojista;
    }

    async create({ username, senha, nome }: ICreateLojistaDTO): Promise<void> {
        await prisma.lojista.create({
            data: {
                username,
                nome,
                senha,
            },
        });
    }

    async update({
        username,
        senha,
        nome,
        id,
    }: IUpdateLojistaDTO): Promise<void> {
        await prisma.lojista.update({
            where: { id },
            data: {
                username,
                senha,
                nome,
            },
        });
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
}
