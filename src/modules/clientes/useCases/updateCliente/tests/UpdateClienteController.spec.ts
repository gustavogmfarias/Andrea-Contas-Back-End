/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { app } from "@shared/infra/http/app";
import request from "supertest";

describe("CLIENTE - Update Cliente Controller", () => {
    it("Deve ser capaz de atualizar um Cliente totalmente", async () => {
        const responseToken = await request(app)
            .post("/sessions")
            .send({ nome: "admin", senha: "admin" });

        const { token } = responseToken.body;

        const clienteNovo = await request(app)
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

        const clienteAtualizado = await request(app)
            .patch(`/clientes/${clienteNovo.body[0].id}`)
            .set({ Authorization: `Bearer ${token}` })
            .send({
                nome: "Tiago",
                sobrenome: "Farias",
                cpf: "1111",
                email: "tiago@farias.com",
                telefone: "229960",
                observacoes: "Irmão",
                bairro: "cidade nova",
                rua: "rua do josé",
                cep: "2830000",
                cidade: "Laje",
                estado: "SP",
                numero: "674",
            });

        const clienteAtualizadoBody = clienteAtualizado.body[0];
        const enderecoAtualizadoBody = clienteAtualizado.body[0].endereco;
        const logBody = clienteAtualizado.body[1];

        expect(clienteAtualizado.status).toBe(200);
        expect(logBody.descricao).toBe("Cliente atualizado com sucesso!");
        expect(clienteNovo.body[0].nome).toBe("Mauricio");

        expect(clienteAtualizadoBody.nome).toBe("Tiago");
        expect(clienteAtualizadoBody.sobrenome).toBe("Farias");
        expect(clienteAtualizadoBody.cpf).toBe("1111");
        expect(clienteAtualizadoBody.email).toBe("tiago@farias.com");
        expect(clienteAtualizadoBody.telefone).toBe("229960");
        expect(clienteAtualizadoBody.observacoes).toBe("Irmão");
        expect(enderecoAtualizadoBody.bairro).toBe("cidade nova");
        expect(enderecoAtualizadoBody.rua).toBe("rua do josé");
        expect(enderecoAtualizadoBody.cep).toBe("2830000");
        expect(enderecoAtualizadoBody.cidade).toBe("Laje");
        expect(enderecoAtualizadoBody.estado).toBe("SP");
        expect(enderecoAtualizadoBody.numero).toBe("674");

        await request(app)
            .delete(`/clientes/${clienteNovo.body[0].id}`)
            .set({ Authorization: `Bearer ${token}` });
    });

    it("Deve ser capaz de atualizar somente um dado de um Cliente", async () => {
        const responseToken = await request(app)
            .post("/sessions")
            .send({ nome: "admin", senha: "admin" });

        const { token } = responseToken.body;

        const clienteNovo = await request(app)
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

        const clienteAtualizado = await request(app)
            .patch(`/clientes/${clienteNovo.body[0].id}`)
            .set({ Authorization: `Bearer ${token}` })
            .send({
                nome: "Tiago",
            });

        const clienteAtualizadoBody = clienteAtualizado.body[0];
        const logBody = clienteAtualizado.body[1];

        expect(clienteAtualizado.status).toBe(200);
        expect(logBody.descricao).toBe("Cliente atualizado com sucesso!");
        expect(clienteNovo.body[0].nome).toBe("Mauricio");

        expect(clienteAtualizadoBody.nome).toBe("Tiago");

        await request(app)
            .delete(`/clientes/${clienteNovo.body[0].id}`)
            .set({ Authorization: `Bearer ${token}` });
    });

    it("Não deve ser capaz de atualizar um cliente se ele não existe", async () => {
        const responseToken = await request(app)
            .post("/sessions")
            .send({ username: "admin", senha: "admin" });

        const { token } = responseToken.body;

        const responseclienteAtualizado = await request(app)
            .patch(`/clientes/idfalso111`)
            .set({ Authorization: `Bearer ${token}` })
            .send({ nome: "gustavo" });

        expect(responseclienteAtualizado.status).toBe(404);
        expect(responseclienteAtualizado.body.message).toBe(
            "Cliente doesn't exist"
        );
    });

    it("Não deve ser capaz de atualizar um cliente se o token está inválido ou expirado", async () => {
        const responseclienteAtualizado = await request(app)
            .patch(`/clientes/idfalso111`)
            .set({ Authorization: `Bearer tokenFalse111` })
            .send({ nome: "gustavo" });

        expect(responseclienteAtualizado.body.message).toBe("Invalid Token");
    });

    it("Não deve ser capaz de atualizar um cliente se não estiver logado", async () => {
        const responseclienteAtualizado = await request(app)
            .patch(`/clientes/idfalso111`)
            .send({ nome: "gustavo" });

        expect(responseclienteAtualizado.body.message).toBe("Token missing");
    });
});
