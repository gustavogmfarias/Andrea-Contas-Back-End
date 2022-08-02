import { ILojistasRepository } from "@modules/accounts/repositories/ILojistasRepository";
import { IClientesRepository } from "@modules/clientes/repositories/IClientesRepository";
import { IContasRepository } from "@modules/contas/repositories/IContasRepository";
import { Conta } from "@prisma/client";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { ILogProvider } from "@shared/container/providers/LogProvider/ILogProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ICreateContasDTO } from "../../dtos/ICreateContasDTO";

@injectable()
class CreateContasUseCase {
    constructor(
        @inject("ContasRepository")
        private contasRepository: IContasRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
        @inject("ClientesRepository")
        private clientesRepository: IClientesRepository,
        @inject("LojistasRepository")
        private lojistasRepository: ILojistasRepository,
        @inject("LogProvider")
        private logProvider: ILogProvider
    ) {}

    async execute({
        observacoes,
        numeroParcelas,
        valorInicial,
        dataVencimentoInicial,
        fkIdLojista,
        fkIdCliente,
    }: ICreateContasDTO): Promise<Conta> {
        const clienteExists = await this.clientesRepository.findById(
            fkIdCliente
        );

        if (!clienteExists) {
            throw new AppError("Cliente doesn't exist", 400);
        }

        const lojistaExists = await this.lojistasRepository.findById(
            fkIdLojista
        );

        if (!lojistaExists) {
            throw new AppError("Lojista doesn't exist", 400);
        }

        const contaCriada = await this.contasRepository.create({
            criadoEm: this.dateProvider.convertToUtc3Hours(new Date()),
            editadoEm: this.dateProvider.convertToUtc3Hours(new Date()),
            observacoes,
            numeroParcelas,
            numeroParcelasAtual: numeroParcelas,
            valorInicial,
            valorParcela: valorInicial / numeroParcelas,
            valorAtual: valorInicial,
            dataVencimentoInicial,
            dataVencimentoAtual: dataVencimentoInicial,
            dataVencimentoFinal: this.dateProvider.addMonths(
                dataVencimentoInicial,
                numeroParcelas
            ),
            fkIdLojista,
            fkIdCliente,
        });

        const log = await this.logProvider.create({
            logRepository: "CONTA",
            descricao: `Criada uma conta`,
            conteudoAnterior: "Não se aplica",
            conteudoNovo: JSON.stringify(contaCriada),
            lojistaId: fkIdLojista,
            modelAtualizadoId: fkIdCliente,
        });

        return contaCriada;
    }
}

export { CreateContasUseCase };
