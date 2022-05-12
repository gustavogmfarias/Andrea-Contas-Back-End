import { prisma } from "@shared/database/prismaClient";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";

import { User } from "@prisma/client";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

export class UsersRepository implements IUsersRepository {
    async create({
        name,
        password,
        email,
        avatar_url?,
        role?,
    }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name,
            password,
            email,
            avatar_url?,
            role?
        });
        await prisma.user.create(user);
    }


}

