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
                numeroParcelas: 2,
                valorInicial: 20,
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
        // ContaF: erro data anterior
        // conta D: 20 reais / 2 parcelas
    });

    it("Deve ser capaz de realizar um pagamento no mesmo valor de uma parcela de uma conta e deixar um log e trocar a data de vencimento atual", async () => {
        const pagamento = await request(app)
            .post(`/contas/realizarpagamento/${contaBodyA.id}`)
            .send({
                dataPagamento: new Date(),
                valorPagamento: 20,
            })
            .set({ Authorization: `Bearer ${lojistaToken}` });

        const contaAbatidaA = await request(app)
            .get(`/contas/findbyid/${contaBodyA.id}`)
            .set({ Authorization: `Bearer ${lojistaToken}` });

        expect(pagamento.status).toBe(201);
        expect(pagamento.body).toHaveLength(3);

        expect(pagamento.body[1].descricao).toBe("Pagamento realizado");
        expect(contaAbatidaA.body.valorAtual).toBe(80);
        expect(contaAbatidaA.body.dataVencimentoAtual).toBe(
            dateProvider.convertToString(
                dateProvider.addMonths(contaBodyA.dataVencimentoInicial, 1)
            )
        );

        expect(contaAbatidaA.body.numeroParcelasAtual).toBe(4);

        // observacoes: "ContaA",
        //         numeroParcelas: 5,
        //         valorInicial: 100,
        //         dataVencimentoInicial: dateProvider.addDays(3),
        //         fkIdCliente: clienteBodyA.id,
    });

    it("Deve ser capaz de realizar um pagamento e inativar uma conta caso o valor atual seja zero", async () => {
        const pagamento1 = await request(app)
            .post(`/contas/realizarpagamento/${contaBodyD.id}`)
            .send({
                dataPagamento: new Date(),
                valorPagamento: 10,
            })
            .set({ Authorization: `Bearer ${lojistaToken}` });

        const pagamento2 = await request(app)
            .post(`/contas/realizarpagamento/${contaBodyD.id}`)
            .send({
                dataPagamento: new Date(),
                valorPagamento: 10,
            })
            .set({ Authorization: `Bearer ${lojistaToken}` });

        const contaAbatidaD = await request(app)
            .get(`/contas/findbyid/${contaBodyD.id}`)
            .set({ Authorization: `Bearer ${lojistaToken}` });

        expect(pagamento2.status).toBe(201);
        expect(contaAbatidaD.body.valorAtual).toBe(0);
        expect(contaAbatidaD.body.numeroParcelasAtual).toBe(0);
        expect(contaAbatidaD.body.ativo).toBe(false);

        // observacoes: "ContaD",
        // numeroParcelas: 2,
        // valorInicial: 20,
        // dataVencimentoInicial: dateProvider.addDays(4),
        // fkIdCliente: clienteBodyA.id,
    });

    it("Deve ser capaz de realizar um pagamento no valor inferior de uma parcela de uma conta e deixar um log e recalcular o valor da parcela atual", async () => {
        const pagamento = await request(app)
            .post(`/contas/realizarpagamento/${contaBodyC.id}`)
            .send({
                dataPagamento: new Date(),
                valorPagamento: 1,
            })
            .set({ Authorization: `Bearer ${lojistaToken}` });

        const contaAbatidaC = await request(app)
            .get(`/contas/findbyid/${contaBodyC.id}`)
            .set({ Authorization: `Bearer ${lojistaToken}` });

        expect(pagamento.status).toBe(201);
        expect(pagamento.body).toHaveLength(3);

        expect(pagamento.body[2].descricao).toBe("Pagamento realizado");
        expect(contaAbatidaC.body.valorAtual).toBe(99);
        expect(contaAbatidaC.body.valorParcela).toBe(11);

        expect(contaAbatidaC.body.numeroParcelasAtual).toBe(9);

        // observacoes: "ContaC",
        // numeroParcelas: 10,
        // valorInicial: 100,
        // dataVencimentoInicial: dateProvider.addDays(1),
        // fkIdCliente: clienteBodyC.id,
    });

    it("Deve ser capaz de realizar um pagamento no valor superior de uma parcela de uma conta e deixar um log e recalcular o valor da parcela atual", async () => {
        const pagamento = await request(app)
            .post(`/contas/realizarpagamento/${contaBodyE.id}`)
            .send({
                dataPagamento: new Date(),
                valorPagamento: 53,
            })
            .set({ Authorization: `Bearer ${lojistaToken}` });

        const contaAbatidaE = await request(app)
            .get(`/contas/findbyid/${contaBodyE.id}`)
            .set({ Authorization: `Bearer ${lojistaToken}` });

        expect(pagamento.status).toBe(201);
        expect(pagamento.body).toHaveLength(3);

        expect(pagamento.body[2].descricao).toBe("Pagamento realizado");
        expect(contaAbatidaE.body.valorAtual).toBe(27);
        expect(contaAbatidaE.body.valorParcela).toBe(3);

        expect(contaAbatidaE.body.numeroParcelasAtual).toBe(9);

        // observacoes: "ContaE",
        // numeroParcelas: 10,
        // valorInicial: 80,
        // dataVencimentoInicial: dateProvider.addDays(5),
        // fkIdCliente: clienteBodyB.id,
    });

    it("Não deve ser capaz de realizar um pagamento se não estiver logado", async () => {
        const response = await request(app)
            .post(`/contas/realizarpagamento/${contaBodyE.id}`)
            .send({
                dataPagamento: new Date(),
                valorPagamento: 53,
            });

        expect(response.body.message).toBe("Token missing");
    });

    it("Não deve ser capaz de realizar um pagamento se o token estiver inválido ou expirado", async () => {
        const response = await request(app)
            .post(`/contas/realizarpagamento/${contaBodyE.id}`)
            .send({
                dataPagamento: new Date(),
                valorPagamento: 53,
            })
            .set({ Authorization: `Bearer 111` });

        expect(response.body.message).toBe("Invalid Token");
    });

    it("Não deve ser capaz de realizar um pagamento se uma conta estiver inativa", async () => {
        const pagamento1 = await request(app)
            .post(`/contas/realizarpagamento/${contaBodyD.id}`)
            .send({
                dataPagamento: new Date(),
                valorPagamento: 10,
            })
            .set({ Authorization: `Bearer ${lojistaToken}` });

        expect(pagamento1.status).toBe(400);
        expect(pagamento1.body.message).toBe("Conta já inativada");

        // observacoes: "ContaD",
        // numeroParcelas: 2,
        // valorInicial: 20,
        // dataVencimentoInicial: dateProvider.addDays(4),
        // fkIdCliente: clienteBodyA.id,
    });

    it("Não deve ser capaz de realizar um pagamento se uma conta não existe", async () => {
        const pagamento1 = await request(app)
            .post(`/contas/realizarpagamento/1111`)
            .send({
                dataPagamento: new Date(),
                valorPagamento: 10,
            })
            .set({ Authorization: `Bearer ${lojistaToken}` });

        expect(pagamento1.status).toBe(404);
        expect(pagamento1.body.message).toBe("Conta não existe");

        // observacoes: "ContaD",
        // numeroParcelas: 2,
        // valorInicial: 20,
        // dataVencimentoInicial: dateProvider.addDays(4),
        // fkIdCliente: clienteBodyA.id,
    });
});
