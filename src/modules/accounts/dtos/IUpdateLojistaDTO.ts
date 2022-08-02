export interface IUpdateLojistaDTO {
    id: string;
    nome?: string;
    username?: string;
    senha?: string;
    confirmaSenha?: string;
    senhaAntiga?: string;
    editadoEm: Date;
}
