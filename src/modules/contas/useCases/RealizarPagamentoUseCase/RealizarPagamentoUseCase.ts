/* eslint-disable prefer-const */
import { ILojistasRepository } from "@modules/accounts/repositories/ILojistasRepository";
import { IClientesRepository } from "@modules/clientes/repositories/IClientesRepository";
import { IRealizarPagamentoDTO } from "@modules/contas/dtos/IRealizarPagamentoDTO";
import { IContasRepository } from "@modules/contas/repositories/IContasRepository";
import { Conta, Pagamento } from "@prisma/client";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { ILogProvider } from "@shared/container/providers/LogProvider/ILogProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class RealizarPagamentoUseCase {
    constructor(
        @inject("ContasRepository")
        private contasRepository: IContasRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
        @inject("LogProvider")
        private logProvider: ILogProvider,
        @inject("LojistasRepository")
        private lojistasRepository: ILojistasRepository
    ) {}

    async execute({
        dataPagamento,
        fkIdConta,
        fkIdLojista,
        valorPagamento,
    }: IRealizarPagamentoDTO): Promise<Pagamento> {
        const contaASerAbatida = await this.contasRepository.findById(
            fkIdConta
        );

        let pagamentoRealizado: Pagamento;

        let {
            numeroParcelasAtual,
            valorParcela,
            valorAtual,
            dataVencimentoAtual,
            ativo,
        } = await this.contasRepository.findById(fkIdConta);

        if (ativo === false) {
            throw new AppError("Conta já inativada", 400);
        }

        if (!contaASerAbatida) {
            throw new AppError("Conta não existe", 404);
        }

        if (valorParcela === valorPagamento) {
            numeroParcelasAtual -= 1;
            valorAtual -= valorPagamento;
            dataVencimentoAtual = await this.dateProvider.addMonths(
                dataVencimentoAtual,
                1
            );

            if (valorAtual === 0) {
                ativo = false;
            }

            const contaAtualizada = await this.contasRepository.update(
                fkIdConta,
                {
                    editadoEm: this.dateProvider.dateNow(),
                    numeroParcelasAtual,
                    valorParcela,
                    dataVencimentoAtual,
                    ativo,
                    valorAtual,
                }
            );

            await this.logProvider.create({
                logRepository: "CONTA",
                descricao: `Conta atualizado a partir de um Pagamento`,
                conteudoAnterior: JSON.stringify(contaASerAbatida),
                conteudoNovo: JSON.stringify(contaAtualizada),
                lojistaId: fkIdLojista,
                modelAtualizadoId: fkIdConta,
            });

            pagamentoRealizado = await this.contasRepository.realizarPagamento({
                dataPagamento,
                fkIdConta,
                fkIdLojista,
                valorPagamento,
            });

            await this.logProvider.create({
                logRepository: "CONTA",
                descricao: `Pagamento realizado`,
                conteudoAnterior: JSON.stringify(pagamentoRealizado),
                conteudoNovo: JSON.stringify(pagamentoRealizado),
                lojistaId: fkIdLojista,
                modelAtualizadoId: pagamentoRealizado.id,
            });
        }
        return pagamentoRealizado;
    }
}
export { RealizarPagamentoUseCase };
