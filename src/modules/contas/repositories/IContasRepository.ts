import { Conta, Pagamento } from "@prisma/client";
import { ICreateContasDTO } from "../dtos/ICreateContasDTO";
import { IRealizarPagamentoDTO } from "../dtos/IRealizarPagamentoDTO";
import { IUpdateContasDTO } from "../dtos/IUpdateContasDTO";

export interface IContasRepository {
    create(data: ICreateContasDTO): Promise<Conta>;
    update(id: string, data: IUpdateContasDTO): Promise<Conta>;
    findById(id: string): Promise<Conta>;
    realizarPagamento(data: IRealizarPagamentoDTO): Promise<Pagamento>;
}
