import { ICreateContasDTO } from "@modules/contas/dtos/ICreateContasDTO";
import { IListContasDTO } from "@modules/contas/dtos/IListContasDTO";
import { IRealizarPagamentoDTO } from "@modules/contas/dtos/IRealizarPagamentoDTO";
import { IUpdateContasDTO } from "@modules/contas/dtos/IUpdateContasDTO";
import { Conta, Pagamento } from "@prisma/client";
import { prisma } from "@shared/database/prismaClient";
import { IPaginationRequestDTO } from "@shared/dtos/IPaginationRequestDTO";
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
        fkIdLojista,
        fkIdCliente,
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
                fkIdLojista,
                fkIdCliente,
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
        fkIdConta,
        fkIdLojista,
        valorPagamento,
    }: IRealizarPagamentoDTO): Promise<Pagamento> {
        const pagamentoRealizado = prisma.pagamento.create({
            data: { dataPagamento, fkIdConta, fkIdLojista, valorPagamento },
        });

        return pagamentoRealizado;
    }

    async list(
        {
            startDate,
            endDate,
            inadimplentes,
            dataAtual,
            ativo,
            cliente,
            lojista,
        }: IListContasDTO,
        { page, perPage }: IPaginationRequestDTO
    ): Promise<Conta[]> {
        let contas: Conta[];

        if (!page || !perPage) {
            contas = await prisma.conta.findMany({
                where: {
                    ativo,
                    fkIdCliente: cliente,
                    fkIdLojista: lojista,
                    criadoEm: { gte: startDate, lte: endDate },
                    dataVencimentoAtual: {
                        gte: "2018-08-10T00:00:00.598Z",
                        lte: dataAtual,
                    },
                },
                orderBy: {
                    id: "desc",
                },
            });
        } else {
            contas = await prisma.conta.findMany({
                where: {
                    ativo,
                    fkIdCliente: cliente,
                    fkIdLojista: lojista,
                    criadoEm: { gte: startDate, lte: endDate },
                    dataVencimentoAtual: {
                        gte: "2018-08-10T00:00:00.598Z",
                        lte: dataAtual,
                    },
                },
                take: Number(perPage),
                skip: (Number(page) - 1) * Number(perPage),
                orderBy: {
                    id: "desc",
                },
            });
        }

        return contas;
    }
}

export { ContasRepository };
