/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { app } from "@shared/infra/http/app";
import request from "supertest";
import { prisma } from "@shared/database/prismaClient";

/* eslint-disable prefer-destructuring */

describe("CLIENTE -  Profile  Controller", () => {
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
    let contaPagamentoA;
    let contaPagamentoA2;
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

        contaPagamentoA = await request(app)
            .post(`/contas/realizarpagamento/${contaBodyA.id}`)
            .send({
                dataPagamento: dateProvider.addDays(1),
                valorPagamento: 10,
            })
            .set({ Authorization: `Bearer ${lojistaToken}` });

        contaPagamentoA2 = await request(app)
            .post(`/contas/realizarpagamento/${contaBodyA.id}`)
            .send({
                dataPagamento: dateProvider.addDays(5),
                valorPagamento: 20,
            })
            .set({ Authorization: `Bearer ${lojistaToken}` });

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

        // Cliente A: 4 conta, 2 normais, 1 inadimplente 1 inativa
        // Cliente B: 2 conta
        // Cliente C: 1 conta
        // Total contas: 7 | 5 adimplentes e 1 inadimplente, 1 inativa
        // total clientes: 3 | inadimplentes: 1 (A) | adimplentes: 2 (b e c) + 2 clientes criados no seed
        // ContaF: inadimplente
        // ContaG: inativa
    });

    it("Deve ser capaz de retornar o profile de um cliente", async () => {
        const profileClienteA = await request(app)
            .get(`/clientes/profile/${clienteBodyA.id}`)
            .set({ Authorization: `Bearer ${lojistaToken}` });
        expect(profileClienteA.status).toBe(200);
        expect(profileClienteA.body.clienteProfileDTO.id).toBe(clienteBodyA.id);
        expect(profileClienteA.body.clienteProfileDTO.endereco.rua).toBe(
            "rua da cehab"
        );
        expect(profileClienteA.body.contasCliente).toHaveLength(4);
        expect(profileClienteA.body.pagamentos).toHaveLength(2);
        expect(profileClienteA.body.pagamentos[0].id).toBe(
            contaPagamentoA2.body[0].id
        );

        expect(profileClienteA.body.ultimoPagamentoCliente.id).toBe(
            contaPagamentoA2.body[0].id
        );
        expect(profileClienteA.body.ultimoPagamentoCliente.valorPagamento).toBe(
            20
        );
        expect(profileClienteA.body.valorTotalContasCliente).toBe("340.00");
        expect(profileClienteA.body.valorDevedorCliente).toBe("230.00");
        expect(profileClienteA.body.totalContasCliente).toBe(4);
        expect(profileClienteA.body.totalContasClienteAtivas).toBe(3);
    });

    it("Não deve ser capaz de retornar o profile de um cliente se não estiver logado", async () => {
        const profile = await request(app).get(
            `/clientes/profile/${clienteBodyA.id}`
        );
        expect(profile.body.message).toBe("Token missing");
    });

    it("Não deve ser capaz de retornar o profile de um cliente se o token estiver inválido ou expirado", async () => {
        const profile = await request(app)
            .get(`/clientes/profile/${clienteBodyA.id}`)
            .set({ Authorization: `Bearer 111` });

        expect(profile.body.message).toBe("Invalid Token");
    });
});
