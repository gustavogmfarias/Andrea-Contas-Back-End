import { Request, Response } from "express";
import { container } from "tsyringe";
import { RealizarPagamentoUseCase } from "./RealizarPagamentoUseCase";

class RealizarPagamentoController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id: fk_id_lojista } = request.lojista;
        const { idConta: fk_id_conta } = request.params;
        const { dataPagamento, valorPagamento } = request.body;

        const realizarPagamentoUseCase = container.resolve(
            RealizarPagamentoUseCase
        );

        const pagamentoRealizado = await realizarPagamentoUseCase.execute({
            dataPagamento,
            fk_id_conta,
            fk_id_lojista,
            valorPagamento,
        });

        return response.status(201).send(pagamentoRealizado);
    }
}
export { RealizarPagamentoController };
