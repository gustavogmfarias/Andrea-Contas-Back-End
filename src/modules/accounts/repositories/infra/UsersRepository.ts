import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";

import { User } from "@prisma/client";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

import { prisma } from "@shared/database/prismaClient";

export class UsersRepository implements IUsersRepository {
    findByEmail(email: string): Promise<User> {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        return user;
    }

    async findById(id: string): Promise<User> {
        const user = await prisma.user.findUnique({
            where: {
                id: id,
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
}
