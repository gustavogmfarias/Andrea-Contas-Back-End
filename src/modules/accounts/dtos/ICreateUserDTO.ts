import { Role } from "@prisma/client";

export interface ICreateUserDTO {
    name: string;
    password: string;
    email: string;
    avatar_url?: string;
    role: Role;
}
