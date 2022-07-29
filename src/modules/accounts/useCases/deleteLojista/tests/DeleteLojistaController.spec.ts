/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { LojistasRepository } from "@modules/accounts/repositories/infra/LojistasRepository";
import { app } from "@shared/infra/http/app";
import request from "supertest";

describe("LOJISTA - Delete Lojista Controller", () => {
    it("Deve ser capaz de deletar um lojista", async () => {
        const responseToken = await request(app)
            .post("/sessions")
            .send({ username: "admin", senha: "admin" });

        const { token } = responseToken.body;

        const lojistaCriado = await request(app)
            .post("/lojistas")
            .send({
                nome: "mauricio",
                username: "mauricio",
                senha: "mauricio",
            })
            .set({ Authorization: `Bearer ${token}` });

        const { id } = lojistaCriado.body;

        const response = await request(app)
            .delete(`/lojistas/delete/${id}`)
            .set({ Authorization: `Bearer ${token}` });

        expect(response.status).toBe(200);
    });

    it("Não Deve ser capaz de deletar um lojista se não estiver logado", async () => {
        const responseToken = await request(app)
            .post("/sessions")
            .send({ username: "admin", senha: "admin" });

        const { token } = responseToken.body;

        const lojistaCriado = await request(app)
            .post("/lojistas")
            .send({
                nome: "mauricio",
                username: "mauricio",
                senha: "mauricio",
            })
            .set({ Authorization: `Bearer ${token}` });

        const { id } = lojistaCriado.body;

        const response = await request(app).delete(`/lojistas/delete/${id}`);

        expect(response.body.message).toBe("Token missing");
    });

    it("Não Deve ser capaz de deletar um lojista se o token for invalido ou expirado", async () => {
        const responseToken = await request(app)
            .post("/sessions")
            .send({ username: "admin", senha: "admin" });

        const { token } = responseToken.body;

        const lojistaCriado = await request(app)
            .post("/lojistas")
            .send({
                nome: "mauricio",
                username: "mauricio",
                senha: "mauricio",
            })
            .set({ Authorization: `Bearer ${token}` });

        const { id } = lojistaCriado.body;

        const response = await request(app)
            .delete(`/lojistas/delete/${id}`)
            .set({ Authorization: `Bearer 1111` });
        expect(response.body.message).toBe("Invalid Token");
    });
});
