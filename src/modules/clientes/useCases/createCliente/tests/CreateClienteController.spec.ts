/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { LogProvider } from "@shared/container/providers/LogProvider/implementations/LogProvider";
import { app } from "@shared/infra/http/app";
import request from "supertest";

describe("CLIENTE - Create Cliente Controller", () => {
    const logProvider = new LogProvider();
    it("Deve ser capaz de criar um Cliente e gravar um log", async () => {
        const responseToken = await request(app)
            .post("/sessions")
            .send({ username: "admin", senha: "admin" });

        const { token } = responseToken.body;

        const response = await request(app)
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

        const clienteBody = response.body[0];
        const logBody = response.body[1];

        expect(response.status).toBe(201);
        expect(clienteBody.nome).toBe("Mauricio");
        expect(clienteBody.endereco.rua).toBe("rua da cehab");
        expect(logBody.descricao).toBe("Cliente criado com sucesso!");
    });

    it("Não deve ser capaz de criar um cliente sem endereco", async () => {
        const responseToken = await request(app)
            .post("/sessions")
            .send({ username: "admin", senha: "admin" });

        const { token } = responseToken.body;

        const response = await request(app)
            .post("/clientes")
            .send({
                nome: "Gustavo",
                sobrenome: "Goulart",
                cpf: "1111",
                email: "gustavo@gmail.com",
                telefone: "777",
                observacoes: "filhao",
                bairro: "cehab",
                cep: "55",
                cidade: "itaperuna",
                estado: "rj",
                numero: "22",
            })
            .set({ Authorization: `Bearer ${token}` });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Cliente não pode ser cadastrado");
    });

    it("Não deve ser capaz de criar um cliente sem cpf", async () => {
        const responseToken = await request(app)
            .post("/sessions")
            .send({ username: "admin", senha: "admin" });

        const { token } = responseToken.body;

        const response = await request(app)
            .post("/clientes")
            .send({
                nome: "Mauricio",
                sobrenome: "Goulart",
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

        expect(response.body.message).toBe(
            "Não pode cadastrar um cliente sem cpf"
        );
    });

    it("Não deve ser capaz de criar um Cliente com o mesmo cpf", async () => {
        const responseToken = await request(app)
            .post("/sessions")
            .send({ username: "admin", senha: "admin" });

        const { token } = responseToken.body;

        const response = await request(app)
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

        expect(response.status).toBe(409);
        expect(response.body.message).toBe("Cliente already exists");
    });

    it("Não deve ser capaz de criar um Cliente se o token for inválido ou expirado", async () => {
        const response = await request(app)
            .post("/clientes")
            .send({
                nome: "Mauricio",
                sobrenome: "Goulart",
                cpf: "999",
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
            .set({ Authorization: `Bearer 1111` });

        expect(response.status).toBe(401);
        expect(response.body.message).toBe("Invalid Token");
    });

    it("Não deve ser capaz de criar um Cliente se o Lojista não estiver logado", async () => {
        const response = await request(app).post("/clientes").send({
            nome: "Mauricio",
            sobrenome: "Goulart",
            cpf: "999",
            email: "mau@a.com",
            telefone: "777",
            observacoes: "filhao",
            bairro: "cehab",
            rua: "rua da cehab",
            cep: "55",
            cidade: "itaperuna",
            estado: "rj",
            numero: "22",
        });

        expect(response.status).toBe(401);
        expect(response.body.message).toBe("Token missing");
    });
});
