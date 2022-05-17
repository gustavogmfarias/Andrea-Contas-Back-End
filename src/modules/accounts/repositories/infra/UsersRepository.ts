import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";

import { User } from "@prisma/client";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

import { prisma } from "@shared/database/prismaClient";

export class UsersRepository implements IUsersRepository {
    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        return user;
    }

    async findById(id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                id,
            },
        });

        return user;
    }

    async create({
        name,
        password,
        email,
        avatar_url,
        role,
    }: ICreateUserDTO): Promise<void> {
        await prisma.user.create({
            data: {
                name,
                password,
                email,
                avatar_url,
                role,
            },
        });
    }

    async update(user: User): Promise<void> {
        await prisma.user.update({
            where: { id: user.id },
            data: {
                name: user.name,
                password: user.password,
                email: user.email,
                avatar_url: user.avatar_url,
                role: user.role,
            },
        });
    }
}
