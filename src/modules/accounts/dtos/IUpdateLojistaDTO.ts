export interface IUpdateLojistaDTO {
    id: string;
    nome?: string;
    username?: string;
    senha?: string;
    confirma_senha?: string;
    senha_antiga?: string;
    editadoEm: Date;
}
