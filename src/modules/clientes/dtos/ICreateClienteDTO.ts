export interface ICreateClienteDTO {
    id?: string;
    nome: string;
    sobrenome: string;
    cpf: string;
    email: string;
    telefone: string;
    observacoes: string;
    avatarUrl?: string;
    endereco?: string;
}
