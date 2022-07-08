import { Endereco } from "@prisma/client";

export interface ICreateClienteDTO {
    nome: string;
    sobrenome: string;
    cpf: string;
    email: string;
    telefone: string;
    observacoes: string;
    avatarUrl: string;
    endereco: string;
}
