interface IRealizarPagamentoDTO {
    dataPagamento: Date;
    fkIdConta: string;
    fkIdLojista: string;
    fkIdCliente?: string;
    valorPagamento: number;
}

export { IRealizarPagamentoDTO };
