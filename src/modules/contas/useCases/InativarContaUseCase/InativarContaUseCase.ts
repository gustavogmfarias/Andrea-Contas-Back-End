import { inject, injectable } from "tsyringe";
import { IContasRepository } from "@modules/contas/repositories/IContasRepository";
import { AppError } from "@shared/errors/AppError";
import { Conta, Log } from "@prisma/client";
import { ILogProvider } from "@shared/container/providers/LogProvider/ILogProvider";

@injectable()
class InativarContaUseCase {
    constructor(
        @inject("ContasRepository")
        private contasRepository: IContasRepository,
        @inject("LogProvider")
        private logProvider: ILogProvider
    ) {}

    async execute(fkIdLojista: string, id: string): Promise<(Conta | Log)[]> {
        const conta = await this.contasRepository.findById(id);

        if (!conta) {
            throw new AppError("Conta não encontrada", 404);
        }

        if (conta.ativo === false) {
            throw new AppError("Conta já inativada", 400);
        }

        const contaInativada = await this.contasRepository.inativarConta(id);

        const logContaInativada = await this.logProvider.create({
            logRepository: "CONTA",
            descricao: `Conta inativada`,
            conteudoAnterior: JSON.stringify(conta),
            conteudoNovo: JSON.stringify(contaInativada),
            lojistaId: fkIdLojista,
            modelAtualizadoId: id,
        });

        return [contaInativada, logContaInativada];
    }
}
export { InativarContaUseCase };
