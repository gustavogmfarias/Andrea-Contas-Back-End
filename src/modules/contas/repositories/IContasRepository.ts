import { Conta, Pagamento } from "@prisma/client";
import { IPaginationRequestDTO } from "@shared/dtos/IPaginationRequestDTO";
import { ICreateContasDTO } from "../dtos/ICreateContasDTO";
import { IListContasDTO } from "../dtos/IListContasDTO";
import { IListPagamentosDTO } from "../dtos/IListPagamentosDTO";
import { IRealizarPagamentoDTO } from "../dtos/IRealizarPagamentoDTO";
import { IUpdateContasDTO } from "../dtos/IUpdateContasDTO";

export interface IContasRepository {
    create(data: ICreateContasDTO): Promise<Conta>;
    update(id: string, data: IUpdateContasDTO): Promise<Conta>;
    list(data: IListContasDTO, pag: IPaginationRequestDTO): Promise<Conta[]>;
    listPagamentos(
        data: IListPagamentosDTO,
        pag: IPaginationRequestDTO
    ): Promise<Pagamento[]>;
    listParcelas(
        data: IListContasDTO,
        pag: IPaginationRequestDTO
    ): Promise<Conta[]>;
    findById(id: string): Promise<Conta | null>;
    inativarConta(id: string): Promise<Conta>;
    realizarPagamento(data: IRealizarPagamentoDTO): Promise<Pagamento>;
    ultimoPagamento(data: IListPagamentosDTO): Promise<Pagamento>;
    ultimaConta(data: IListContasDTO): Promise<Conta>;
}
