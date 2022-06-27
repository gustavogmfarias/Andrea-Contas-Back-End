/* eslint-disable no-await-in-loop */
import { ICreateLojistaDTO } from "@modules/accounts/dtos/ICreateLojistaDTO";

import { Lojista } from "@prisma/client";

import { ILojistasRepository } from "@modules/accounts/repositories/ILojistasRepository";

import { prisma } from "@shared/database/prismaClient";
import { IUpdateLojistaDTO } from "@modules/accounts/dtos/IUpdateLojistaDTO";

export class LojistasRepository implements ILojistasRepository {
    async findByUserName(username: string): Promise<Lojista | null> {
        const lojista = await prisma.lojista.findUnique({
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

    async create({ username, password }: ICreateLojistaDTO): Promise<void> {
        await prisma.lojista.create({
            data: {
                username,
                password,
            },
        });
    }

    async update({ username, password, id }: IUpdateLojistaDTO): Promise<void> {
        await prisma.lojista.update({
            where: { id },
            data: {
                username,
                password,
            },
        });
    }

    async changeOwnPassword({
        password,
        id,
    }: IUpdateLojistaDTO): Promise<void> {
        await prisma.lojista.update({
            where: { id },
            data: {
                password,
            },
        });
    }

    async listLojistas(): Promise<Lojista[]> {
        const lojistas = await prisma.lojista.findMany({
            orderBy: {
                id: "desc",
            },
        });

        return lojistas;
    }

    async delete(id: string): Promise<void> {
        await prisma.lojista.delete({
            where: { id },
        });
    }
}
