/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { app } from "@shared/infra/http/app";
import request from "supertest";

describe("CLIENTE - List Clientes Controller", () => {
    const dateProvider = new DayjsDateProvider();
    const dataAtual = dateProvider.dateNow();
    let lojistaToken;
    let clienteA;
    let clienteB;
    let clienteC;
    let clienteBodyA;
    let clienteBodyB;
    let clienteBodyC;
    let clienteBBody;

    let contaA;
    let contaB;
    let contaC;
    let contaD;
    let contaE;
    let contaF;
    let lojistaId;

    beforeAll(async () => {
        const lojista = await request(app)
            .post("/sessions")
            .send({ username: "admin", senha: "admin" });

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

        // eslint-disable-next-line prefer-destructuring
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

        // eslint-disable-next-line prefer-destructuring
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

        // eslint-disable-next-line prefer-destructuring
        clienteBodyC = clienteC.body[0];

        contaA = await request(app)
            .post("/contas")
            .send({
                observacoes: "ContaA",
                numeroParcelas: 5,
                valorInicial: 100,
                dataVencimentoInicial: dateProvider.dateNow(),
                fkIdCliente: clienteBodyA.id,
            })
            .set({ Authorization: `Bearer ${lojistaToken}` });

        const contaBodyA = contaA.body[0];

        const lojistaBuscadoPorUsername = await request(app)
            .get(`/lojistas/findbyusername/`)
            .send({
                username: "admin",
            })
            .set({ Authorization: `Bearer ${lojistaToken}` });

        lojistaId = lojistaBuscadoPorUsername.body.id;
    });

    it("Deve ser capaz de listar todos as clientes", async () => {
        const responseToken = await request(app)
            .post("/sessions")
            .send({ username: "admin", senha: "admin" });

        const { token } = responseToken.body;

        const contas = await request(app)
            .get("/contas")
            .set({ Authorization: `Bearer ${token}` });

        expect(contas.status).toBe(200);
        expect(contas.body).toHaveLength(2);
    });

    // it("Não deve ser capaz de listar os clientes se não estiver logado", async () => {
    //     const response = await request(app).get("/clientes");

    //     expect(response.body.message).toBe("Token missing");
    // });

    // it("Não deve ser capaz de listar os clientes se o token estiver inválido ou expirado", async () => {
    //     const response = await request(app)
    //         .get("/clientes")
    //         .set({ Authorization: `Bearer 111` });

    //     expect(response.body.message).toBe("Invalid Token");
    // });

    // it("Deve ser capaz de listar os clientes por pagina", async () => {
    //     const responseToken = await request(app)
    //         .post("/sessions")
    //         .send({ username: "admin", senha: "admin" });

    //     const { token } = responseToken.body;

    //     const response = await request(app)
    //         .get(`/clientes?page=1&perPage=1`)
    //         .set({ Authorization: `Bearer ${token}` });

    //     expect(response.status).toBe(200);
    //     expect(response.body).toHaveLength(1);
    // });
});
