import { prisma } from "../../../shared/database/prismaClient";

interface ICreateUserDTO {
    name: string;
    password: string;
    email: string;
    avatar_url?: string;
    role: 
}

export { ICreateUserDTO };
