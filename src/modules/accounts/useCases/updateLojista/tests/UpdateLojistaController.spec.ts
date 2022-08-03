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

        const lojistaNovo = await request(app)
            .post("/lojistas")
            .send({
                nome: "mauricio",
                username: "mauricio",
                senha: "mauricio",
            })
            .set({ Authorization: `Bearer ${token}` });

        const lojistaAtualizado = await request(app)
            .patch(`/lojistas/update/${lojistaNovo.body[0].id}`)
            .set({ Authorization: `Bearer ${token}` })
            .send({
                username: "tiago",
                nome: "Tiago",
                senha: "tiago123",
                confirmaSenha: "tiago123",
            });

        const tokenlojistaAtualizado = await request(app)
            .post("/sessions")
            .send({ username: "tiago", senha: "tiago123" });

        const lojistaAtualizadoBody = lojistaAtualizado.body[0];
        const logBody = lojistaAtualizado.body[1];

        expect(logBody.descricao).toBe("Lojista atualizado com Sucesso!");
        expect(lojistaNovo.body[0].username).toBe("mauricio");
        expect(lojistaNovo.body[0].nome).toBe("mauricio");
        expect(lojistaAtualizado.status).toBe(200);
        expect(lojistaAtualizadoBody.username).toBe("tiago");
        expect(lojistaAtualizadoBody.nome).toBe("Tiago");
        expect(tokenlojistaAtualizado.body).toHaveProperty("token");
        expect(tokenlojistaAtualizado.body).toHaveProperty("refreshToken");

        await request(app)
            .delete(`/lojistas/${lojistaNovo.body[0].id}`)
            .set({ Authorization: `Bearer ${token}` });
    });

    it("Deve ser capaz de atualizar apenas o username de um Lojista", async () => {
        const responseToken = await request(app)
            .post("/sessions")
            .send({ username: "admin", senha: "admin" });

        const { token } = responseToken.body;

        const lojistaNovo = await request(app)
            .post("/lojistas")
            .send({
                nome: "mauricio",
                username: "mauricio",
                senha: "mauricio",
            })
            .set({ Authorization: `Bearer ${token}` });

        const lojistaAtualizado = await request(app)
            .patch(`/lojistas/update/${lojistaNovo.body[0].id}`)
            .set({ Authorization: `Bearer ${token}` })
            .send({
                username: "tiago",
            });

        const tokenlojistaAtualizado = await request(app)
            .post("/sessions")
            .send({ username: "tiago", senha: "mauricio" });

        const lojistaAtualizadoBody = lojistaAtualizado.body[0];
        const logBody = lojistaAtualizado.body[1];

        expect(logBody.descricao).toBe("Lojista atualizado com Sucesso!");
        expect(lojistaNovo.body[0].username).toBe("mauricio");
        expect(lojistaAtualizado.status).toBe(200);
        expect(lojistaAtualizadoBody.username).toBe("tiago");
        expect(tokenlojistaAtualizado.body).toHaveProperty("token");
        expect(tokenlojistaAtualizado.body).toHaveProperty("refreshToken");

        await request(app)
            .delete(`/lojistas/${lojistaNovo.body[0].id}`)
            .set({ Authorization: `Bearer ${token}` });
    });

    it("Deve ser capaz de atualizar apenas o nome de um Lojista", async () => {
        const responseToken = await request(app)
            .post("/sessions")
            .send({ username: "admin", senha: "admin" });

        const { token } = responseToken.body;

        const lojistaNovo = await request(app)
            .post("/lojistas")
            .send({
                nome: "mauricio",
                username: "mauricio",
                senha: "mauricio",
            })
            .set({ Authorization: `Bearer ${token}` });

        const lojistaAtualizado = await request(app)
            .patch(`/lojistas/update/${lojistaNovo.body[0].id}`)
            .set({ Authorization: `Bearer ${token}` })
            .send({
                nome: "tiago",
            });

        const tokenlojistaAtualizado = await request(app)
            .post("/sessions")
            .send({ username: "mauricio", senha: "mauricio" });

        const lojistaAtualizadoBody = lojistaAtualizado.body[0];
        const logBody = lojistaAtualizado.body[1];

        expect(logBody.descricao).toBe("Lojista atualizado com Sucesso!");
        expect(lojistaNovo.body[0].nome).toBe("mauricio");
        expect(lojistaAtualizado.status).toBe(200);
        expect(lojistaAtualizadoBody.nome).toBe("tiago");
        expect(tokenlojistaAtualizado.body).toHaveProperty("token");
        expect(tokenlojistaAtualizado.body).toHaveProperty("refreshToken");

        await request(app)
            .delete(`/lojistas/${lojistaNovo.body[0].id}`)
            .set({ Authorization: `Bearer ${token}` });
    });

    it("Deve ser capaz de atualizar apenas a senha de um Lojista", async () => {
        const responseToken = await request(app)
            .post("/sessions")
            .send({ username: "admin", senha: "admin" });

        const { token } = responseToken.body;

        const lojistaNovo = await request(app)
            .post("/lojistas")
            .send({
                nome: "mauricio",
                username: "mauricio",
                senha: "mauricio",
            })
            .set({ Authorization: `Bearer ${token}` });

        const lojistaAtualizado = await request(app)
            .patch(`/lojistas/update/${lojistaNovo.body[0].id}`)
            .set({ Authorization: `Bearer ${token}` })
            .send({
                senha: "tiago",
                confirmaSenha: "tiago",
            });

        const tokenlojistaAtualizado = await request(app)
            .post("/sessions")
            .send({ username: "mauricio", senha: "tiago" });

        const logBody = lojistaAtualizado.body[1];

        expect(logBody.descricao).toBe("Lojista atualizado com Sucesso!");
        expect(tokenlojistaAtualizado.body).toHaveProperty("token");
        expect(tokenlojistaAtualizado.body).toHaveProperty("refreshToken");

        await request(app)
            .delete(`/lojistas/${lojistaNovo.body[0].id}`)
            .set({ Authorization: `Bearer ${token}` });
    });

    it("Não deve ser capaz de atualizar a senha de um Lojista se a nova senha e a confirmação não forem iguais", async () => {
        const responseToken = await request(app)
            .post("/sessions")
            .send({ username: "admin", senha: "admin" });

        const { token } = responseToken.body;

        const lojistaNovo = await request(app)
            .post("/lojistas")
            .send({
                nome: "mauricio",
                username: "mauricio",
                senha: "mauricio",
            })
            .set({ Authorization: `Bearer ${token}` });

        const lojistaAtualizado = await request(app)
            .patch(`/lojistas/update/${lojistaNovo.body[0].id}`)
            .set({ Authorization: `Bearer ${token}` })
            .send({
                senha: "tiago",
                confirmaSenha: "gustavo",
            });

        const lojistaAtualizadoBody = lojistaAtualizado.body;

        expect(lojistaAtualizado.status).toBe(401);
        expect(lojistaAtualizadoBody.message).toBe("Passwords don't match");

        await request(app)
            .delete(`/lojistas/${lojistaNovo.body[0].id}`)
            .set({ Authorization: `Bearer ${token}` });
    });

    it("Não deve ser capaz de atualizar um lojista se ele não existe", async () => {
        const responseToken = await request(app)
            .post("/sessions")
            .send({ username: "admin", senha: "admin" });

        const { token } = responseToken.body;

        const responselojistaAtualizado = await request(app)
            .patch(`/lojistas/update/idfalso111`)
            .set({ Authorization: `Bearer ${token}` })
            .send({ username: "gustavo" });

        expect(responselojistaAtualizado.status).toBe(404);
        expect(responselojistaAtualizado.body.message).toBe(
            "Lojista doesn't exist"
        );
    });

    it("Não deve ser capaz de atualizar um lojista se o token está inválido ou expirado", async () => {
        const responselojistaAtualizado = await request(app)
            .patch(`/lojistas/update/idfalso111`)
            .set({ Authorization: `Bearer tokenFalse111` })
            .send({ username: "gustavo" });

        expect(responselojistaAtualizado.body.message).toBe("Invalid Token");
    });

    it("Não deve ser capaz de atualizar um lojista se não estiver logado", async () => {
        const responselojistaAtualizado = await request(app)
            .patch(`/lojistas/update/idfalso111`)
            .send({ username: "gustavo" });

        expect(responselojistaAtualizado.body.message).toBe("Token missing");
    });
});
