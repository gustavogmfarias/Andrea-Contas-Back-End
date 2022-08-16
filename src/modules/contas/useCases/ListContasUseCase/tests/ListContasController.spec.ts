/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { app } from "@shared/infra/http/app";
import request from "supertest";

/* eslint-disable prefer-destructuring */

describe("CLIENTE - List Clientes Controller", () => {
    const dateProvider = new DayjsDateProvider();
    const dataAtual = dateProvider.dateNow();
    let lojistaToken;
    let lojistaAId;
    let lojistaBId;
    let clienteA;
    let clienteB;
    let clienteC;
    let clienteBodyA;
    let clienteBodyB;
    let clienteBodyC;

    let contaA;
    let contaBodyA;
    let contaB;
    let contaBodyB;
    let contaC;
    let contaBodyC;
    let contaD;
    let contaBodyD;
    let contaE;
    let contaBodyE;
    let contaF;
    let contaBodyF;

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
        lojistaAId = lojistaA.body.id;

        const lojistaB = await request(app)
            .post("/sessions")
            .send({ username: "gustavo", senha: "gustavo" });

        const lojistaBBuscado = await request(app)
            .get(`/lojistas/findbyusername/`)
            .send({
                username: "gustavo",
            })
            .set({ Authorization: `Bearer ${lojistaToken}` });

        lojistaBId = lojistaBBuscado.body.id;

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

        clienteBodyA = clienteA.body[0];

        clienteB = await request(app)
            .post("/clientes")
            .send({
                nome: "Gustavo",
                sobrenome: "Goulart",
                cpf: "2",
                email: "gustavo@gmail.com",
                telefone: "22996540260",
                observacoes: "Pai",
                bairro: "cehab",
                rua: "rua josé de assis barbosa",
                cep: "28300000",
                cidade: "itaperuna",
                estado: "rj",
                numero: "714",
            })
            .set({ Authorization: `Bearer ${lojistaToken}` });

        clienteBodyB = clienteB.body[0];

        clienteC = await request(app)
            .post("/clientes")
            .send({
                nome: "Angélica",
                sobrenome: "Medeiros",
                cpf: "3",
                email: "angelica@gmail.com",
                telefone: "22558974",
                observacoes: "Mãe",
                bairro: "cehab",
                rua: "rua platão boechat",
                cep: "28300000",
                cidade: "itaperuna",
                estado: "rj",
                numero: "55",
            })
            .set({ Authorization: `Bearer ${lojistaToken}` });

        clienteBodyC = clienteC.body[0];

        contaA = await request(app)
            .post("/contas")
            .send({
                observacoes: "ContaA",
                numeroParcelas: 5,
                valorInicial: 100,
                dataVencimentoInicial: dateProvider.addDays(3),
                fkIdCliente: clienteBodyA.id,
            })
            .set({ Authorization: `Bearer ${lojistaToken}` });

        contaBodyA = contaA.body[0];

        contaB = await request(app)
            .post("/contas")
            .send({
                observacoes: "ContaB",
                numeroParcelas: 10,
                valorInicial: 100,
                dataVencimentoInicial: dateProvider.addDays(2),
                fkIdCliente: clienteBodyB.id,
            })
            .set({ Authorization: `Bearer ${lojistaToken}` });

        contaBodyB = contaB.body[0];

        contaC = await request(app)
            .post("/contas")
            .send({
                observacoes: "ContaC",
                numeroParcelas: 10,
                valorInicial: 100,
                dataVencimentoInicial: dateProvider.addDays(1),
                fkIdCliente: clienteBodyC.id,
            })
            .set({ Authorization: `Bearer ${lojistaToken}` });

        contaBodyC = contaC.body[0];

        contaD = await request(app)
            .post("/contas")
            .send({
                observacoes: "ContaD",
                numeroParcelas: 10,
                valorInicial: 80,
                dataVencimentoInicial: dateProvider.addDays(4),
                fkIdCliente: clienteBodyA.id,
            })
            .set({ Authorization: `Bearer ${lojistaToken}` });

        contaBodyD = contaD.body[0];

        contaE = await request(app)
            .post("/contas")
            .send({
                observacoes: "ContaE",
                numeroParcelas: 10,
                valorInicial: 80,
                dataVencimentoInicial: dateProvider.addDays(5),
                fkIdCliente: clienteBodyB.id,
            })
            .set({ Authorization: `Bearer ${lojistaToken}` });

        contaBodyE = contaE.body[0];

        contaF = await request(app)
            .post("/contas")
            .send({
                observacoes: "ContaF",
                numeroParcelas: 10,
                valorInicial: 80,
                dataVencimentoInicial: dateProvider.addDays(-1),
                fkIdCliente: clienteBodyA.id,
            })
            .set({ Authorization: `Bearer ${lojistaToken}` });

        contaBodyF = contaF.body[0];
        // Cliente A: 2 conta
        // Cliente B: 2 conta
        // Cliente C: 1 conta
        // ContaF: erro da ta anterior
    });

    it("Deve ser capaz de listar todas as contas por page", async () => {
        const contas = await request(app)
            .get("/contas")
            .set({ Authorization: `Bearer ${lojistaToken}` });

        expect(contas.status).toBe(200);
        expect(contas.body).toHaveLength(5);
    });

    it("Deve ser capaz de listar todas as contas por page", async () => {
        const contasA = await request(app)
            .get("/contas?page=1&perPage=1")
            .set({ Authorization: `Bearer ${lojistaToken}` });
        const contasB = await request(app)
            .get("/contas?page=1&perPage=2")
            .set({ Authorization: `Bearer ${lojistaToken}` });
        expect(contasA.status).toBe(200);
        expect(contasA.body).toHaveLength(1);
        expect(contasB.body).toHaveLength(2);
    });

    it("Deve ser capaz de listar as contas por cliente", async () => {
        const contasA = await request(app)
            .get("/contas")
            .send({ cliente: clienteBodyA.id })
            .set({ Authorization: `Bearer ${lojistaToken}` });

        const contasB = await request(app)
            .get("/contas")
            .send({ cliente: clienteBodyB.id })
            .set({ Authorization: `Bearer ${lojistaToken}` });

        const contasC = await request(app)
            .get("/contas")
            .send({ cliente: clienteBodyC.id })
            .set({ Authorization: `Bearer ${lojistaToken}` });

        expect(contasA.status).toBe(200);
        expect(contasA.body).toHaveLength(2);
        expect(contasB.status).toBe(200);
        expect(contasB.body).toHaveLength(2);
        expect(contasC.status).toBe(200);
        expect(contasC.body).toHaveLength(1);
    });

    it("Deve ser capaz de listar as contas por período", async () => {
        const contasA = await request(app)
            .get("/contas")
            .send({
                startDate: contaBodyA.criadoEm,
                endDate: contaBodyA.criadoEm,
            })
            .set({ Authorization: `Bearer ${lojistaToken}` });

        expect(contasA.status).toBe(200);
        expect(contasA.body).toHaveLength(5);
    });

    it("Deve ser capaz de listar as contas inadimplentes", async () => {
        const contasA = await request(app)
            .get("/contas")
            .send({
                inadimplentes: true,
            })
            .set({ Authorization: `Bearer ${lojistaToken}` });

        expect(contasA.status).toBe(200);
        expect(contasA.body).toHaveLength(0);
    });

    it("Deve ser capaz de listar as contas ativas ou não", async () => {
        const contasA = await request(app)
            .get("/contas")
            .send({
                ativo: true,
            })
            .set({ Authorization: `Bearer ${lojistaToken}` });

        const contasB = await request(app)
            .get("/contas")
            .send({
                ativo: false,
            })
            .set({ Authorization: `Bearer ${lojistaToken}` });

        expect(contasA.status).toBe(200);
        expect(contasA.body).toHaveLength(5);
        expect(contasB.body).toHaveLength(0);
    });

    it("Deve ser capaz de listar as contas por lojista", async () => {
        const contasA = await request(app)
            .get("/contas")
            .send({
                lojista: lojistaAId,
            })
            .set({ Authorization: `Bearer ${lojistaToken}` });

        const contasB = await request(app)
            .get("/contas")
            .send({
                lojista: lojistaBId,
            })
            .set({ Authorization: `Bearer ${lojistaToken}` });

        expect(contasA.status).toBe(200);
        expect(contasA.body).toHaveLength(5);
        expect(contasB.body).toHaveLength(0);
    });

    it("Não deve ser capaz de listar as se não estiver logado", async () => {
        const response = await request(app).get("/contas");

        expect(response.body.message).toBe("Token missing");
    });

    it("Não deve ser capaz de listar as contas se o token estiver inválido ou expirado", async () => {
        const response = await request(app)
            .get("/contas")
            .set({ Authorization: `Bearer 111` });

        expect(response.body.message).toBe("Invalid Token");
    });
});
