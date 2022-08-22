/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { prisma } from "@shared/database/prismaClient";
import { app } from "@shared/infra/http/app";
import request from "supertest";

/* eslint-disable prefer-destructuring */

describe("CONTAS - Get Total Parcelas Controller", () => {
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
                dataVencimentoInicial: dateProvider.addDays(1),
                fkIdCliente: clienteBodyA.id,
            })
            .set({ Authorization: `Bearer ${lojistaToken}` });

        contaBodyF = contaF.body[0];
        const contaFInadimplente = await prisma.conta.update({
            where: { id: contaBodyF.id },
            data: {
                dataVencimentoAtual: dateProvider.addDays(-2),
                dataVencimentoInicial: dateProvider.addDays(-2),
            },
        });

        // Cliente A: 2 conta
        // Cliente B: 2 conta
        // Cliente C: 1 conta

        // totalAReceber 540
        // totalInadimplente: 80

        // contaA parcela: 20 - venc 3
        // contaB parcela: 10 - venc 2
        // contaC parcela: 10 - venc 1
        // contaD parcela: 8 - venc 4
        // contaE parcela: 8 - venc 5
        // contaF parcela: 8 - venc -2
        // total:  62
        // total in: 8
    });

    it("Deve ser capaz de calcular o total a receber de parcelas entre Períodos de todas as contas ativas", async () => {
        const contas = await request(app)
            .get("/contas/gettotalparcelasareceber")
            .send({
                ativo: true,
                startDate: "2020-07-11T00:00:00.352Z",
                endDate: dateProvider.addDays(8),
            })
            .set({ Authorization: `Bearer ${lojistaToken}` });

        const contasB = await request(app)
            .get("/contas/gettotalparcelasareceber")
            .send({
                ativo: true,
                startDate: dateProvider.dateNow(),
                endDate: dateProvider.addDays(3),
            })
            .set({ Authorization: `Bearer ${lojistaToken}` });

        const contasC = await request(app)
            .get("/contas/gettotalparcelasareceber")
            .send({
                ativo: true,
                startDate: dateProvider.addDays(3),
                endDate: dateProvider.addDays(5),
            })
            .set({ Authorization: `Bearer ${lojistaToken}` });

        expect(contas.status).toBe(200);
        expect(contas.body).toBe("64.00");
        expect(contasB.status).toBe(200);
        expect(contasB.body).toBe("40.00");
        expect(contasC.status).toBe(200);
        expect(contasC.body).toBe("16.00");
    });

    it("Deve ser capaz de calcular o total a receber de parcelas entre Períodos de todas as parcelas Ativas Inadimplentes", async () => {
        const contas = await request(app)
            .get("/contas/gettotalparcelasareceber")
            .send({
                ativo: true,
                startDate: "2020-07-11T00:00:00.352Z",
                inadimplentes: true,
            })
            .set({ Authorization: `Bearer ${lojistaToken}` });

        expect(contas.status).toBe(200);
        expect(contas.body).toBe("8.00");
    });

    it("Deve ser capaz de calcular o total a receber de parcelas entre Períodos de todas as contas ativas por clientes", async () => {
        const contas = await request(app)
            .get("/contas/gettotalparcelasareceber")
            .send({
                ativo: true,
                startDate: "2020-07-11T00:00:00.352Z",
                endDate: dateProvider.addDays(8),
                cliente: clienteBodyC.id,
            })
            .set({ Authorization: `Bearer ${lojistaToken}` });

        expect(contas.status).toBe(200);
        expect(contas.body).toBe("10.00");
    });

    it("Não deve ser capaz de listar as se não estiver logado", async () => {
        const response = await request(app).get(
            "/contas/gettotalparcelasareceber"
        );

        expect(response.body.message).toBe("Token missing");
    });

    it("Não deve ser capaz de listar as contas se o token estiver inválido ou expirado", async () => {
        const response = await request(app)
            .get("/contas/gettotalparcelasareceber")
            .set({ Authorization: `Bearer 111` });

        expect(response.body.message).toBe("Invalid Token");
    });
});
