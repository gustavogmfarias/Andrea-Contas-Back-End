import { ICreateContasDTO } from "@modules/contas/dtos/ICreateContasDTO";
import { Conta } from "@prisma/client";
import { prisma } from "@shared/database/prismaClient";
import { IContasRepository } from "../IContasRepository";

class ContasRepository implements IContasRepository {
    async create({
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
    }: ICreateContasDTO): Promise<Conta> {
        const contaCriada = await prisma.conta.create({
            data: {
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
}

export { ContasRepository };
