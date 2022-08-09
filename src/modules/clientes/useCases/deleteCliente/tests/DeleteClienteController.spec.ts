/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { app } from "@shared/infra/http/app";
import request from "supertest";

describe("LOJISTA - Delete Cliente Controller", () => {
    const dateProvider = new DayjsDateProvider();
    const dataAtual = dateProvider.dateNow();

    it("Deve ser capaz de deletar um cliente e adicionar um log", async () => {
        const responseToken = await request(app)
            .post("/sessions")
            .send({ username: "admin", senha: "admin" });

        const { token } = responseToken.body;

        const clienteCriado = await request(app)
            .post("/clientes")
            .send({
                nome: "Mauricio",
                sobrenome: "Goulart",
                cpf: "777",
                email: "mau@a.com",
                telefone: "777",
                observacoes: "filhao",
                bairro: "cehab",
                rua: "rua da cehab",
                cep: "55",
                cidade: "itaperuna",
                estado: "rj",
                numero: "22",
            })
            .set({ Authorization: `Bearer ${token}` });

        const clienteCriadoResponseBody = clienteCriado.body[0];

        const { id } = clienteCriadoResponseBody;

        const clienteDeletado = await request(app)
            .delete(`/clientes/${id}`)
            .set({ Authorization: `Bearer ${token}` });

        const clienteDeletadoReponseBody = clienteDeletado.body[0];
        const logClienteDeletadoReponseBody = clienteDeletado.body[1];

        expect(clienteDeletado.status).toBe(200);
        expect(logClienteDeletadoReponseBody.descricao).toBe(
            "Cliente deletado com Sucesso!"
        );
    });

    it("Não deve ser capaz de deletar um cliente se ele tiver uma conta ativa", async () => {
        const responseToken = await request(app)
            .post("/sessions")
            .send({ username: "admin", senha: "admin" });

        const { token } = responseToken.body;

        const clienteCriado = await request(app)
            .post("/clientes")
            .send({
                nome: "Mauricio",
                sobrenome: "Goulart",
                cpf: "777",
                email: "mau@a.com",
                telefone: "777",
                observacoes: "filhao",
                bairro: "cehab",
                rua: "rua da cehab",
                cep: "55",
                cidade: "itaperuna",
                estado: "rj",
                numero: "22",
            })
            .set({ Authorization: `Bearer ${token}` });

        const clienteCriadoResponseBody = clienteCriado.body[0];
        const { id } = clienteCriadoResponseBody;

        const contaCliente = await request(app)
            .post("/contas")
            .send({
                observacoes: "conta 1",
                numeroParcelas: 12,
                valorInicial: 120,
                dataVencimentoInicial: dateProvider.addHours(1),
                fkIdCliente: id,
            })
            .set({ Authorization: `Bearer ${token}` });

        const clienteDeletado = await request(app)
            .delete(`/clientes/${id}`)
            .set({ Authorization: `Bearer ${token}` });

        expect(contaCliente.status).toBe(201);
        expect(clienteDeletado.status).toBe(400);
        expect(clienteDeletado.body.message).toBe(
            "Não pode deletar um cliente se ele estiver uma conta ativa!"
        );
    });

    it("Não Deve ser capaz de deletar um cliente se não estiver logado", async () => {
        const responseToken = await request(app)
            .post("/sessions")
            .send({ username: "admin", senha: "admin" });

        const { token } = responseToken.body;

        const clienteCriado = await request(app)
            .post("/clientes")
            .send({
                nome: "Mauricio",
                sobrenome: "Goulart",
                cpf: "001",
                email: "mau@ac.com",
                telefone: "777",
                observacoes: "filhao",
                bairro: "cehab",
                rua: "rua da cehab",
                cep: "55",
                cidade: "itaperuna",
                estado: "rj",
                numero: "22",
            })
            .set({ Authorization: `Bearer ${token}` });

        const { id } = clienteCriado.body[0];

        const response = await request(app).delete(`/clientes/${id}`);

        expect(response.body.message).toBe("Token missing");
    });

    it("Não Deve ser capaz de deletar um cliente se o token for invalido ou expirado", async () => {
        const responseToken = await request(app)
            .post("/sessions")
            .send({ username: "admin", senha: "admin" });

        const { token } = responseToken.body;

        const clienteCriado = await request(app)
            .post("/clientes")
            .send({
                nome: "Mauricio",
                sobrenome: "Goulart",
                cpf: "010101",
                email: "mau@ab.com",
                telefone: "777",
                observacoes: "filhao",
                bairro: "cehab",
                rua: "rua da cehab",
                cep: "55",
                cidade: "itaperuna",
                estado: "rj",
                numero: "22",
            })
            .set({ Authorization: `Bearer ${token}` });

        const { id } = clienteCriado.body[0];

        const response = await request(app)
            .delete(`/clientes/${id}`)
            .set({ Authorization: `Bearer 1111` });
        expect(response.body.message).toBe("Invalid Token");
    });
});
