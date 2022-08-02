interface IRealizarPagamentoDTO {
    dataPagamento: Date;
    fkIdConta: string;
    fkIdLojista: string;
    valorPagamento: number;
}

export { IRealizarPagamentoDTO };
