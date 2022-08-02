export interface ICreateContasDTO {
    criadoEm?: Date;
    editadoEm?: Date;
    observacoes: string;
    numeroParcelas: number;
    numeroParcelasAtual?: number;
    valorParcela?: number;
    valorInicial: number;
    valorAtual?: number;
    dataVencimentoInicial: Date;
    dataVencimentoFinal?: Date;
    dataVencimentoAtual: Date;
    fkIdLojista: string;
    fkIdCliente: string;
}
