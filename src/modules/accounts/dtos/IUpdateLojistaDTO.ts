import { Role } from "@prisma/client";

export interface IUpdateLojistaDTO {
    id: string;
    name?: string;
    last_name?: string;
    email?: string;
    role?: Role;
    password?: string;
    confirm_password?: string;
    old_password?: string;
}
