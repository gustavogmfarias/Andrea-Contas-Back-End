export interface ICreateContasDTO {
    observacoes: string;
    numeroParcelas: number;
    numeroParcelasAtual?: number;
    valorParcela?: number;
    valorInicial: number;
    valorAtual?: number;
    dataVencimentoInicial: Date;
    dataVencimentoFinal?: Date;
    fk_id_lojista: string;
    fk_id_cliente: string;
}
