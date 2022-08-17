/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { app } from "@shared/infra/http/app";
import request from "supertest";

/* eslint-disable prefer-destructuring */

describe("CONTA - Inativar Conta Controller", () => {
    const dateProvider = new DayjsDateProvider();
    const dataAtual = dateProvider.dateNow();
    let lojistaToken;
    let clienteA;
    let contaA;
    let contaB;

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

        contaB = await request(app)
            .post("/contas")
            .send({
                observacoes: "ContaB",
                numeroParcelas: 5,
                valorInicial: 100,
                dataVencimentoInicial: dateProvider.addDays(3),
                fkIdCliente: clienteA.body[0].id,
            })
            .set({ Authorization: `Bearer ${lojistaToken}` });
    });

    it("Deve ser capaz de inativar um conta por id", async () => {
        const contaAbatidaA = await request(app)
            .patch(`/contas/inativarconta/${contaA.body[0].id}`)
            .set({ Authorization: `Bearer ${lojistaToken}` });

        expect(contaAbatidaA.status).toBe(200);
        expect(contaAbatidaA.body[0].ativo).toBe(false);
    });

    it("Não deve ser capaz de inativar uma conta se ela já está inativada", async () => {
        const contaAbatidaB = await request(app)
            .patch(`/contas/inativarconta/${contaB.body[0].id}`)
            .set({ Authorization: `Bearer ${lojistaToken}` });

        const contaAbatidaB2 = await request(app)
            .patch(`/contas/inativarconta/${contaA.body[0].id}`)
            .set({ Authorization: `Bearer ${lojistaToken}` });
        expect(contaAbatidaB.status).toBe(200);
        expect(contaAbatidaB.body[0].ativo).toBe(false);
        expect(contaAbatidaB2.status).toBe(400);
        expect(contaAbatidaB2.body.message).toBe("Conta já inativada");
    });

    it("Não deve ser capaz de inativar uma conta se ela não existe", async () => {
        const contaAbatidaC = await request(app)
            .patch(`/contas/inativarconta/1111`)
            .set({ Authorization: `Bearer ${lojistaToken}` });

        expect(contaAbatidaC.status).toBe(404);
        expect(contaAbatidaC.body.message).toBe("Conta não encontrada");
    });

    it("Não deve ser capaz de inativar o conta por id se não estiver logado", async () => {
        const contaAbatidaA = await request(app).patch(
            `/contas/inativarconta/${contaA.body[0].id}`
        );

        expect(contaAbatidaA.body.message).toBe("Token missing");
    });

    it("Não deve ser capaz de achar o conta por id se o token estiver inválido ou expirado", async () => {
        const contaAbatidaA = await request(app)
            .patch(`/contas/inativarconta/${contaA.body[0].id}`)
            .set({ Authorization: `Bearer 111` });

        expect(contaAbatidaA.body.message).toBe("Invalid Token");
    });
});
