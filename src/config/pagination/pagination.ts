import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { User } from "@prisma/client";
import { prisma } from "@shared/database/prismaClient";
import { inject, injectable } from "tsyringe";

interface IPaginationAttr {
    currentPage?: number;
    currentObjects?: [];
    totalPages?: number;
    totalItems?: number;
}

@injectable()
export default class pagination {
    constructor(
        @inject("UsersRepository")
        private usersRepository?: IUsersRepository
    ) {}

    async execute(currentPage: number): Promise<User[]> {
        const users = await this.usersRepository.listUsers();
        return users;
    }
}
