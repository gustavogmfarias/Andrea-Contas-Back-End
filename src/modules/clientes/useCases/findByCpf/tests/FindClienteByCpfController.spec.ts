/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { app } from "@shared/infra/http/app";
import request from "supertest";

describe("CLIENTE - Find Cliente by  Cpf Controller", () => {
    it("Deve ser capaz de buscar um cliente por cpf", async () => {
        const responseToken = await request(app)
            .post("/sessions")
            .send({ username: "admin", senha: "admin" });
        const { token } = responseToken.body;

        const clienteCriado = await request(app)
            .post("/clientes")
            .send({
                nome: "Mauricio",
                sobrenome: "Goulart",
                cpf: "111",
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

        const { cpf } = clienteCriado.body[0];

        const responsePorCpf = await request(app)
            .get(`/clientes/findbycpf/${cpf}`)
            .set({ Authorization: `Bearer ${token}` });

        expect(responsePorCpf.status).toBe(200);
        expect(responsePorCpf.body.nome).toBe("Mauricio");
    });

    it("Não deve ser capaz de buscar o cliente por cpf se não estiver logado", async () => {
        const response = await request(app).get(`/clientes/findbycpf/1111`);

        expect(response.body.message).toBe("Token missing");
    });

    it("Não deve ser capaz de achar o cliente por cpf se o token estiver inválcpfo ou expirado", async () => {
        const response = await request(app)
            .get(`/clientes/findbycpf/111`)
            .set({ Authorization: `Bearer 111` });

        expect(response.body.message).toBe("Invalid Token");
    });
});
