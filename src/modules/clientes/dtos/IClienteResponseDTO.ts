import { IEnderecoResponseDTO } from "./IEnderecoResponseDTO";

interface IClienteResponseDTO {
    nome: string;
    sobrenome: string;
    cpf: string;
    email: string;
    telefone: string;
    observacoes: string;
    avatarUrl: string;
}

export { IClienteResponseDTO };
