import { User } from "@prisma/client";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUpdateUserDTO } from "../dtos/IUpdateUserDTO";

export interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<void>;
    delete(id: string): Promise<void>;
    listUsers(): Promise<User[] | null>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    update(data: IUpdateUserDTO): Promise<void>;
    avatarUrl(user: User): Promise<string>;
}
