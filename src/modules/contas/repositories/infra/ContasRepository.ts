import { ICreateContasDTO } from "@modules/contas/dtos/ICreateContasDTO";
import { IRealizarPagamentoDTO } from "@modules/contas/dtos/IRealizarPagamentoDTO";
import { IUpdateContasDTO } from "@modules/contas/dtos/IUpdateContasDTO";
import { Conta, Pagamento } from "@prisma/client";
import { prisma } from "@shared/database/prismaClient";
import { IContasRepository } from "../IContasRepository";

class ContasRepository implements IContasRepository {
    async create({
        criadoEm,
        editadoEm,
        observacoes,
        numeroParcelas,
        numeroParcelasAtual,
        valorParcela,
        valorInicial,
        valorAtual,
        dataVencimentoInicial,
        dataVencimentoFinal,
        dataVencimentoAtual,
        fk_id_lojista,
        fk_id_cliente,
    }: ICreateContasDTO): Promise<Conta> {
        const contaCriada = await prisma.conta.create({
            data: {
                dataVencimentoAtual,
                criadoEm,
                editadoEm,
                observacoes,
                numeroParcelas,
                numeroParcelasAtual,
                valorParcela,
                valorInicial,
                valorAtual,
                dataVencimentoInicial,
                dataVencimentoFinal,
                fk_id_lojista,
                fk_id_cliente,
            },
        });

        return contaCriada;
    }

    async update(
        id: string,
        {
            editadoEm,
            observacoes,
            numeroParcelasAtual,
            valorParcela,
            dataVencimentoAtual,
            ativo,
            valorAtual,
        }: IUpdateContasDTO
    ): Promise<Conta> {
        const contaEditada = await prisma.conta.update({
            where: { id },
            data: {
                editadoEm,
                observacoes,
                numeroParcelasAtual,
                valorParcela,
                dataVencimentoAtual,
                ativo,
                valorAtual,
            },
        });

        return contaEditada;
    }

    async findById(id: string): Promise<Conta> {
        const conta = await prisma.conta.findUnique({
            where: {
                id,
            },
        });

        return conta;
    }

    async realizarPagamento({
        dataPagamento,
        fk_id_conta,
        fk_id_lojista,
        valorPagamento,
    }: IRealizarPagamentoDTO): Promise<Pagamento> {
        const pagamentoRealizado = prisma.pagamento.create({
            data: { dataPagamento, fk_id_conta, fk_id_lojista, valorPagamento },
        });

        return pagamentoRealizado;
    }
}

export { ContasRepository };
