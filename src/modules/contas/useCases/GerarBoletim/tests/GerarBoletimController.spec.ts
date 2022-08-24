/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { app } from "@shared/infra/http/app";
import request from "supertest";
import { prisma } from "@shared/database/prismaClient";

/* eslint-disable prefer-destructuring */

describe("CONTAS - Gerar Boletim  Controller", () => {
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
    let contaG;
    let contaBodyG;

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
                dataVencimentoInicial: dateProvider.addDays(2),
                fkIdCliente: clienteBodyA.id,
            })
            .set({ Authorization: `Bearer ${lojistaToken}` });

        contaBodyF = contaF.body[0];

        const contaFInadimplente = await prisma.conta.update({
            where: { id: contaBodyF.id },
            data: { dataVencimentoAtual: dateProvider.addDays(-2) },
        });

        contaG = await request(app)
            .post("/contas")
            .send({
                observacoes: "ContaG",
                numeroParcelas: 10,
                valorInicial: 80,
                dataVencimentoInicial: dateProvider.addDays(2),
                fkIdCliente: clienteBodyA.id,
            })
            .set({ Authorization: `Bearer ${lojistaToken}` });

        contaBodyG = contaG.body[0];

        const contaGInativa = await prisma.conta.update({
            where: { id: contaBodyG.id },
            data: { ativo: false },
        });

        // Cliente A: 2 conta
        // Cliente B: 2 conta
        // Cliente C: 1 conta
        // Total contas: 7 | 5 adimplentes e 1 inadimplente, 1 inativa
        // total clientes: 3 | inadimplentes: 1 (A) | adimplentes: 2 (b e c) + 2 clientes criados no seed
        // ContaF: inadimplente
        // ContaG: inativa
    });

    it("Deve ser capaz de retornar o boletim total", async () => {
        const boletim = await request(app)
            .get("/contas/gerarboletim")
            .set({ Authorization: `Bearer ${lojistaToken}` });
        expect(boletim.status).toBe(200);
        expect(boletim.body.faturamentoTotal).toBe("620.00");
        expect(boletim.body.clientesAdimplentes).toBe(4); // 2 clientes adimplentes criados no seed + 2 adimplentes criados aqui no teste
        expect(boletim.body.clientesInadimplentes).toBe(1);
        expect(boletim.body.totalContas).toBe(7);
        expect(boletim.body.contasAtivas).toBe(6);
        expect(boletim.body.contasInativas).toBe(1);
        expect(boletim.body.contasAdimplentes).toBe(5);
        expect(boletim.body.contasInadimplentes).toBe(1);
    });

    it("Não deve ser capaz de retornar o boletim de contas se não estiver logado", async () => {
        const boletim = await request(app).get("/contas/gerarboletim");
        expect(boletim.body.message).toBe("Token missing");
    });

    it("Não deve ser capaz de retornar o total de clientes adimplentes se o token estiver inválido ou expirado", async () => {
        const boletim = await request(app)
            .get("/contas/gerarboletim")
            .set({ Authorization: `Bearer 111` });

        expect(boletim.body.message).toBe("Invalid Token");
    });
});
