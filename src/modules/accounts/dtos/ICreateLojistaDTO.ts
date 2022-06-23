import { Role } from "@prisma/client";

export interface ICreateLojistaDTO {
    name: string;
    last_name: string;
    password: string;
    email: string;
    avatar_url?: string;
    role?: Role;
}
