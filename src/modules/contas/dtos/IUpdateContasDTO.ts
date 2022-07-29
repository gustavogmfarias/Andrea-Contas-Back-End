export interface IUpdateContasDTO {
    editadoEm: Date;
    observacoes?: string;
    numeroParcelasAtual: number;

    valorParcela: number;
    valorAtual: number;
    dataVencimentoAtual: Date;
    ativo: boolean;
}
