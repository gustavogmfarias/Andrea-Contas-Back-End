import { IEnderecoResponseDTO } from "./IEnderecoResponseDTO";

interface IClienteResponseDTO {
    id: string;
    criadoEm?: Date;
    editadoEm?: Date;
    nome: string;
    sobrenome: string;
    cpf: string;
    email: string;
    telefone: string;
    observacoes: string;
    avatarUrl?: string;
    endereco?: {
        rua: string;
        bairro: string;
        numero: string;
        cidade: string;
        estado: string;
        cep: string;
    };
}

export { IClienteResponseDTO };
