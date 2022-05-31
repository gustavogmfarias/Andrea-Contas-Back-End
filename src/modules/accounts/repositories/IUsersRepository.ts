import { User } from "@prisma/client";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";

export interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<void>;
    listUsers(): Promise<User[] | null>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    update(user: User): Promise<void>;
    avatarUrl(user: User): Promise<string>;
}
