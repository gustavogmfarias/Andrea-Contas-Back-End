/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { app } from "@shared/infra/http/app";
import request from "supertest";

describe("LOJISTA - Update Lojista Controller", () => {
    it("Deve ser capaz de atualizar um Lojista totalmente", async () => {
        const responseToken = await request(app)
            .post("/sessions")
            .send({ username: "admin", senha: "admin" });

        const { token } = responseToken.body;

        const LojistaBuscado = await request(app)
            .get("/lojistas/findbyusername")
            .set({ Authorization: `Bearer ${token}` })
            .send({ username: "gustavo" });

        const LojistaAtualizado = await request(app)
            .patch(`/lojistas/update/${LojistaBuscado.body.id}`)
            .set({ Authorization: `Bearer ${token}` })
            .send({
                username: "mauricio",
                nome: "mauricio",
                senha: "abc123",
                confirma_senha: "abc123",
            });

        const tokenLojistaAtualizado = await request(app)
            .post("/sessions")
            .send({ username: "mauricio", senha: "abc123" });

        expect(LojistaBuscado.body.username).toBe("gustavo");
        expect(LojistaBuscado.body.nome).toBe("gustavo");
        expect(LojistaAtualizado.status).toBe(200);
        expect(LojistaAtualizado.body.username).toBe("mauricio");
        expect(LojistaAtualizado.body.nome).toBe("mauricio");
        expect(tokenLojistaAtualizado.body).toHaveProperty("token");
        expect(tokenLojistaAtualizado.body).toHaveProperty("refresh_token");
    });

    it("Deve ser capaz de atualizar um Lojista por apenas o username", async () => {
        const responseToken = await request(app)
            .post("/sessions")
            .send({ username: "admin", senha: "admin" });

        const { token } = responseToken.body;

        const responseLojistaBuscado = await request(app)
            .get("/lojistas/findbyusername")
            .set({ Authorization: `Bearer ${token}` })
            .send({ username: "mauricio" });

        const responseLojistaAtualizado = await request(app)
            .patch(`/lojistas/update/${responseLojistaBuscado.body.id}`)
            .set({ Authorization: `Bearer ${token}` })
            .send({ username: "gustavo" });

        expect(responseLojistaBuscado.body.username).toBe("mauricio");
        expect(responseLojistaAtualizado.status).toBe(200);
        expect(responseLojistaAtualizado.body.username).toBe("gustavo");
    });

    it("Deve ser capaz de atualizar  apenas o nome de um Lojista", async () => {
        const responseToken = await request(app)
            .post("/sessions")
            .send({ username: "admin", senha: "admin" });

        const { token } = responseToken.body;

        const responseLojistaBuscado = await request(app)
            .get("/lojistas/findbyusername")
            .set({ Authorization: `Bearer ${token}` })
            .send({ username: "gustavo" });

        const responseLojistaAtualizado = await request(app)
            .patch(`/lojistas/update/${responseLojistaBuscado.body.id}`)
            .set({ Authorization: `Bearer ${token}` })
            .send({ nome: "gustavo" });

        expect(responseLojistaBuscado.body.nome).toBe("mauricio");
        expect(responseLojistaAtualizado.status).toBe(200);
        expect(responseLojistaAtualizado.body.nome).toBe("gustavo");
    });

    it("Deve ser capaz de atualizar apenas a senha de um Lojista", async () => {
        const responseToken = await request(app)
            .post("/sessions")
            .send({ username: "gustavo", senha: "abc123" });

        const { token } = responseToken.body;

        const LojistaBuscado = await request(app)
            .get("/lojistas/findbyusername")
            .set({ Authorization: `Bearer ${token}` })
            .send({ username: "gustavo" });

        const LojistaAtualizado = await request(app)
            .patch(`/lojistas/update/${LojistaBuscado.body.id}`)
            .set({ Authorization: `Bearer ${token}` })
            .send({
                senha: "gustavo",
                confirma_senha: "gustavo",
            });

        const tokenLojistaAtualizado = await request(app)
            .post("/sessions")
            .send({ username: "gustavo", senha: "gustavo" });

        expect(LojistaAtualizado.status).toBe(200);
        expect(tokenLojistaAtualizado.body).toHaveProperty("token");
        expect(tokenLojistaAtualizado.body).toHaveProperty("refresh_token");
    });

    it("Não deve ser capaz de atualizar a senha de um Lojista se a nova senha e a confirmação não forem iguais", async () => {
        const responseToken = await request(app)
            .post("/sessions")
            .send({ username: "gustavo", senha: "gustavo" });

        const { token } = responseToken.body;

        const LojistaBuscado = await request(app)
            .get("/lojistas/findbyusername")
            .set({ Authorization: `Bearer ${token}` })
            .send({ username: "gustavo" });

        const LojistaAtualizado = await request(app)
            .patch(`/lojistas/update/${LojistaBuscado.body.id}`)
            .set({ Authorization: `Bearer ${token}` })
            .send({
                senha: "gustavo",
                confirma_senha: "goulart",
            });

        expect(LojistaAtualizado.status).toBe(401);
        expect(LojistaAtualizado.body.message).toBe("Passwords don't match");
    });

    it("Não deve ser capaz de atualizar um lojista se ele não existe", async () => {
        const responseToken = await request(app)
            .post("/sessions")
            .send({ username: "admin", senha: "admin" });

        const { token } = responseToken.body;

        const responseLojistaAtualizado = await request(app)
            .patch(`/lojistas/update/idfalso111`)
            .set({ Authorization: `Bearer ${token}` })
            .send({ username: "gustavo" });

        expect(responseLojistaAtualizado.status).toBe(404);
        expect(responseLojistaAtualizado.body.message).toBe(
            "Lojista doesn't exist"
        );
    });

    it("Não deve ser capaz de atualizar um lojista se o token está inválido ou expirado", async () => {
        const responseLojistaAtualizado = await request(app)
            .patch(`/lojistas/update/idfalso111`)
            .set({ Authorization: `Bearer tokenFalse111` })
            .send({ username: "gustavo" });

        expect(responseLojistaAtualizado.body.message).toBe("Invalid Token");
    });

    it("Não deve ser capaz de atualizar um lojista se não estiver logado", async () => {
        const responseLojistaAtualizado = await request(app)
            .patch(`/lojistas/update/idfalso111`)
            .send({ username: "gustavo" });

        expect(responseLojistaAtualizado.body.message).toBe("Token missing");
    });

    // it("Não deve ser capaz de atualizar a senha de  lojista se a senha e a confirmação de senha não são iguais", async () => {}
});
