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
            fk_id_cliente,
        } = request.body;

        const createContaUseCase = container.resolve(CreateContasUseCase);

        const contaCriada = await createContaUseCase.execute({
            observacoes,
            numeroParcelas,
            valorInicial,
            dataVencimentoInicial,
            fk_id_lojista: id,
            fk_id_cliente,
        });

        return response.status(201).send(contaCriada);
    }
}

export { CreateContasController };
