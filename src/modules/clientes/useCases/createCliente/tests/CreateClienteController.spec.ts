/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { app } from "@shared/infra/http/app";
import request from "supertest";

describe("CLIENTE - Create Cliente Controller", () => {
    it("Deve ser capaz de criar um lojista", async () => {
        const responseToken = await request(app)
            .post("/sessions")
            .send({ username: "admin", senha: "admin" });

        const { token } = responseToken.body;

        const response = await request(app)
            .post("/lojistas")
            .send({
                nome: "mauricio",
                username: "mauricio",
                senha: "mauricio",
            })
            .set({ Authorization: `Bearer ${token}` });

        expect(response.status).toBe(201);
    });

    it("Não deve ser capaz de criar um lojista com mesmo username", async () => {
        const responseToken = await request(app)
            .post("/sessions")
            .send({ username: "admin", senha: "admin" });

        const { token } = responseToken.body;

        const response = await request(app)
            .post("/lojistas")
            .send({
                nome: "admin",
                username: "admin",
                senha: "admin",
            })
            .set({ Authorization: `Bearer ${token}` });

        expect(response.body.message).toBe("Lojista already exists");
    });

    it("Não deve ser capaz de criar um lojista se não estiver logado", async () => {
        const response = await request(app).post("/lojistas").send({
            nome: "mauricio",
            username: "mauricio",
            senha: "mauricio",
        });

        expect(response.body.message).toBe("Token missing");
    });

    it("Não deve ser capaz de criar um lojista se o token for invalido ou expirado", async () => {
        const response = await request(app)
            .post("/lojistas")
            .send({
                nome: "mauricio",
                username: "mauricio",
                senha: "mauricio",
            })
            .set({ Authorization: `Bearer 1111` });

        expect(response.body.message).toBe("Invalid Token");
    });
});

// Deve ser capaz de criar um cliente
// Não deve ser capaz de criar um cliente sem endereço
// Não deve ser capaz de criar um cliente sem cpf
// Não deve ser capaz de criar um cliente com o mesmo cpf
// Não deve ser capaz de criar um cliente se o token for inválido ou expirado
// Não deve ser capaz de criar um cliente se não estiver logado
// Ao criar um cliente deve ficar salvo um log
