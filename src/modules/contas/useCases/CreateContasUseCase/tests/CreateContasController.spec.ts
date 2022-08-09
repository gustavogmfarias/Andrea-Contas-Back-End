/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { app } from "@shared/infra/http/app";
import request from "supertest";

describe("CONTAS - Create Contas Controller", () => {
    const dateProvider = new DayjsDateProvider();
    const dataAtual = dateProvider.dateNow();
    let lojistaToken;
    let cliente;
    let clienteBody;
    let lojistaId;

    beforeAll(async () => {
        const lojista = await request(app)
            .post("/sessions")
            .send({ username: "admin", senha: "admin" });

        lojistaToken = lojista.body.token;

        cliente = await request(app)
            .post("/clientes")
            .send({
                nome: "Mauricio",
                sobrenome: "Goulart",
                cpf: "111",
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

        // eslint-disable-next-line prefer-destructuring
        clienteBody = cliente.body[0];

        const lojistaBuscadoPorUsername = await request(app)
            .get(`/lojistas/findbyusername/`)
            .send({
                username: "admin",
            })
            .set({ Authorization: `Bearer ${lojistaToken}` });

        lojistaId = lojistaBuscadoPorUsername.body.id;
    });

    it("Deve ser capaz de criar uma conta e gravar um log", async () => {
        const conta = await request(app)
            .post("/contas")
            .send({
                observacoes: "Conta de Teste",
                numeroParcelas: 12,
                valorInicial: 120,
                dataVencimentoInicial: dateProvider.addHours(1),
                fkIdCliente: clienteBody.id,
            })
            .set({ Authorization: `Bearer ${lojistaToken}` });

        const contaBody = conta.body[0];
        const logContaBody = conta.body[1];

        expect(conta.status).toBe(201);
        expect(contaBody.observacoes).toBe("Conta de Teste");
        expect(contaBody.fkIdCliente).toBe(clienteBody.id);
        expect(contaBody.fkIdLojista).toBe(lojistaId);
        expect(logContaBody.descricao).toBe("Conta Criada com Sucesso!");
    });

    it("Não deve ser capaz de criar uma conta se a data de vencimento for menor que o dia atual", async () => {
        const conta = await request(app)
            .post("/contas")
            .send({
                observacoes: "Conta de Teste",
                numeroParcelas: 12,
                valorInicial: 120,
                dataVencimentoInicial: "2021-09-07T10:10:19.832Z",
                fkIdCliente: clienteBody.id,
            })
            .set({ Authorization: `Bearer ${lojistaToken}` });

        expect(conta.status).toBe(400);
        expect(conta.body.message).toBe(
            "Data de venciamento não pode ser menor que a data atual!"
        );
    });

    it("Deve ser capaz de criar uma conta e o valor da parcela deve estar de acordo com o número de parcelas", async () => {
        const conta = await request(app)
            .post("/contas")
            .send({
                observacoes: "Conta de Teste",
                numeroParcelas: 12,
                valorInicial: 120,
                dataVencimentoInicial: dateProvider.addHours(1),
                fkIdCliente: clienteBody.id,
            })
            .set({ Authorization: `Bearer ${lojistaToken}` });

        const contaBody = conta.body[0];

        expect(contaBody.valorParcela).toBe(10);
        expect(contaBody.numeroParcelasAtual).toBe(12);
    });

    it("Deve ser capaz de criar uma conta e a data de vencimento final deve ser a data atual de vencimento inicial acrescida do numero de parcelas", async () => {
        const dataVencimentoInicial = dateProvider.addHours(1);

        const conta = await request(app)
            .post("/contas")
            .send({
                observacoes: "Conta de Teste",
                numeroParcelas: 12,
                valorInicial: 120,
                dataVencimentoInicial,
                fkIdCliente: clienteBody.id,
            })
            .set({ Authorization: `Bearer ${lojistaToken}` });

        const contaBody = conta.body[0];

        const dataVencimentoFinal = dateProvider.addMonths(
            dataVencimentoInicial,
            12
        );

        expect(
            dateProvider.convertToString(contaBody.dataVencimentoFinal)
        ).toBe(dateProvider.convertToString(dataVencimentoFinal));
    });

    it("Deve ser capaz de criar uma conta e a data de vencimento atual deve ser a data do vencimento vencimento inicial", async () => {
        const dataVencimentoInicial = dateProvider.addHours(1);

        const conta = await request(app)
            .post("/contas")
            .send({
                observacoes: "Conta de Teste",
                numeroParcelas: 12,
                valorInicial: 120,
                dataVencimentoInicial,
                fkIdCliente: clienteBody.id,
            })
            .set({ Authorization: `Bearer ${lojistaToken}` });

        const contaBody = conta.body[0];

        expect(
            dateProvider.convertToString(contaBody.dataVencimentoAtual)
        ).toBe(dateProvider.convertToString(dataVencimentoInicial));
    });

    it("Não deve ser capaz de criar uma conta se o token for inválido ou expirado", async () => {
        const dataVencimentoInicial = dateProvider.addHours(1);

        const conta = await request(app)
            .post("/contas")
            .send({
                observacoes: "Conta de Teste",
                numeroParcelas: 12,
                valorInicial: 120,
                dataVencimentoInicial,
                fkIdCliente: clienteBody.id,
            })
            .set({ Authorization: `Bearer 1111` });
        expect(conta.status).toBe(401);
        expect(conta.body.message).toBe("Invalid Token");
    });

    it("Não deve ser capaz de criar uma conta se o Lojista não estiver logado", async () => {
        const dataVencimentoInicial = dateProvider.addHours(1);
        const conta = await request(app).post("/contas").send({
            observacoes: "Conta de Teste",
            numeroParcelas: 12,
            valorInicial: 120,
            dataVencimentoInicial,
            fkIdCliente: clienteBody.id,
        });

        expect(conta.status).toBe(401);
        expect(conta.body.message).toBe("Token missing");
    });
});
