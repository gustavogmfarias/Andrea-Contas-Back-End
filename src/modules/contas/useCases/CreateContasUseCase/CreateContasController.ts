import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateContasUseCase } from "./CreateContasUseCase";

class CreateContasController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.lojista;

        const {
            observacoes,
            numeroParcelas,
            valorInicial,
            dataVencimentoInicial,
            fkIdCliente,
        } = request.body;

        const createContaUseCase = container.resolve(CreateContasUseCase);

        const contaCriada = await createContaUseCase.execute({
            observacoes,
            numeroParcelas,
            valorInicial,
            dataVencimentoInicial,
            dataVencimentoAtual: dataVencimentoInicial,
            fkIdLojista: id,
            fkIdCliente,
        });

        return response.status(201).send(contaCriada);
    }
}

export { CreateContasController };
