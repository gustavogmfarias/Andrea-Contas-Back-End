import { Request, Response } from "express";
import { container } from "tsyringe";
import { RealizarPagamentoUseCase } from "./RealizarPagamentoUseCase";

class RealizarPagamentoController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id: fkIdLojista } = request.lojista;
        const { idConta: fkIdConta } = request.params;
        const { dataPagamento, valorPagamento } = request.body;

        const realizarPagamentoUseCase = container.resolve(
            RealizarPagamentoUseCase
        );

        const pagamentoRealizado = await realizarPagamentoUseCase.execute({
            dataPagamento,
            fkIdConta,
            fkIdLojista,
            valorPagamento,
        });

        return response.status(201).send(pagamentoRealizado);
    }
}
export { RealizarPagamentoController };
