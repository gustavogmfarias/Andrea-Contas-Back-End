/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { AppError } from "@shared/errors/AppError";
import { app } from "@shared/infra/http/app";
import { hash } from "bcryptjs";
import request from "supertest";

describe("LOJISTA - Change Own Password Controller", () => {
    it("Deve ser capaz de alterar a própia senha do lojista", async () => {
        const responseToken = await request(app)
            .post("/sessions")
            .send({ username: "gustavo", senha: "gustavo" });

        const { token } = responseToken.body;

        const response = await request(app)
            .patch("/lojistas/change-password")
            .send({
                senha_antiga: "gustavo",
                senha: "novaSenha",
                confirma_senha: "novaSenha",
            })
            .set({ Authorization: `Bearer ${token}` });

        const loginSenhaNova = await request(app)
            .post("/sessions")
            .send({ username: "gustavo", senha: "novaSenha" });

        const lojista = response.body[0];
        const log = response.body[1];

        expect(loginSenhaNova.body).toHaveProperty("token");
        expect(response.status).toBe(200);
        expect(log.descricao).toBe("Senha do Lojista atualizado");
    });

    it("Lojista precisa estar com token válido para trocar a própria senha", async () => {
        const response = await request(app)
            .patch("/lojistas/change-password")
            .send({
                senha_antiga: "gustavo",
                senha: "gustavo",
                confirma_senha: "gustavo",
            })
            .set({ Authorization: `Bearer senhaErrada` });

        expect(response.body.message).toBe("Invalid Token");
    });

    it("Lojista precisa estar logado para trocar a própria senha", async () => {
        const response = await request(app)
            .patch("/lojistas/change-password")
            .send({
                senha_antiga: "gustavo",
                senha: "gustavo",
                confirma_senha: "gustavo",
            });

        expect(response.body.message).toBe("Token missing");
    });

    it("Não alterar as senhas se a senha anterior estiver errada", async () => {
        const responseToken = await request(app)
            .post("/sessions")
            .send({ username: "admin", senha: "admin" });

        const { token } = responseToken.body;

        const response = await request(app)
            .patch("/lojistas/change-password")
            .send({
                senha_antiga: "senhaErrada",
                senha: "gustavo",
                confirma_senha: "gustavo",
            })
            .set({ Authorization: `Bearer ${token}` });

        expect(response.body.message).toBe("Last Password doesn't match");
    });

    it("Não alterar as senhas se a nova senha e confirmação de senha não forem as mesmas", async () => {
        const responseToken = await request(app)
            .post("/sessions")
            .send({ username: "admin", senha: "admin" });

        const { token } = responseToken.body;

        const response = await request(app)
            .patch("/lojistas/change-password")
            .send({
                senha_antiga: "admin",
                senha: "gustavo",
                confirma_senha: "gustavoSenhaErrada",
            })
            .set({ Authorization: `Bearer ${token}` });

        expect(response.body.message).toBe("Passwords don't match");
    });
});
