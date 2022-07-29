interface IRealizarPagamentoDTO {
    dataPagamento: Date;
    fk_id_conta: string;
    fk_id_lojista: string;
    valorPagamento: number;
}

export { IRealizarPagamentoDTO };
