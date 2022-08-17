/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { app } from "@shared/infra/http/app";
import request from "supertest";

describe("CONTA - Inativar Conta Controller", () => {
    const dateProvider = new DayjsDateProvider();
    const dataAtual = dateProvider.dateNow();
    let lojistaToken;
    let clienteA;
    let contaA;

    beforeAll(async () => {
        const lojista = await request(app)
            .post("/sessions")
            .send({ username: "admin", senha: "admin" });

        const lojistaA = await request(app)
            .get(`/lojistas/findbyusername/`)
            .send({
                username: "admin",
            })
            .set({ Authorization: `Bearer ${lojistaToken}` });

        lojistaToken = lojista.body.token;

        clienteA = await request(app)
            .post("/clientes")
            .send({
                nome: "Mauricio",
                sobrenome: "Goulart",
                cpf: "1",
                email: "mau@a.com",
                telefone: "2777",
                observacoes: "filhao",
                bairro: "cehab",
                rua: "rua da cehab",
                cep: "55",
                cidade: "itaperuna",
                estado: "rj",
                numero: "22",
            })
            .set({ Authorization: `Bearer ${lojistaToken}` });

        contaA = await request(app)
            .post("/contas")
            .send({
                observacoes: "ContaA",
                numeroParcelas: 5,
                valorInicial: 100,
                dataVencimentoInicial: dateProvider.addDays(3),
                fkIdCliente: clienteA.body[0].id,
            })
            .set({ Authorization: `Bearer ${lojistaToken}` });
    });

    it("Deve ser capaz de inativar um conta por id", async () => {
        const contaAbatidaA = await request(app)
            .post(`/contas/inativarconta/${contaA.body[0].id}`)
            .set({ Authorization: `Bearer ${lojistaToken}` });

        expect(contaAbatidaA.status).toBe(200);
        expect(contaAbatidaA.body[0].ativo).toBe(false);
    });

    it("Não deve ser capaz de inativar o conta por id se não estiver logado", async () => {
        const contaAbatidaA = await request(app).post(
            `/contas/inativarconta/${contaA.body[0].id}`
        );

        expect(contaAbatidaA.body.message).toBe("Token missing");
    });

    it("Não deve ser capaz de achar o conta por id se o token estiver inválido ou expirado", async () => {
        const contaAbatidaA = await request(app)
            .post(`/contas/inativarconta/${contaA.body[0].id}`)
            .set({ Authorization: `Bearer 111` });

        expect(contaAbatidaA.body.message).toBe("Invalid Token");
    });
});
