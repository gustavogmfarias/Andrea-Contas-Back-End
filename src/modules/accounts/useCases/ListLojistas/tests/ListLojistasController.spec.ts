/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { app } from "@shared/infra/http/app";
import request from "supertest";

describe("LOJISTA - List Lojistas Controller", () => {
    it("Deve ser capaz de listar todos os lojistas", async () => {
        const responseToken = await request(app)
            .post("/sessions")
            .send({ username: "admin", senha: "admin" });

        const { token } = responseToken.body;

        const response = await request(app)
            .get("/lojistas")
            .set({ Authorization: `Bearer ${token}` });

        expect(response.status).toBe(201);
        expect(response.body).toHaveLength(2);
    });

    it("Não deve ser capaz de listar os lojistas se não estiver logado", async () => {
        const response = await request(app).get("/lojistas");

        expect(response.body.message).toBe("Token missing");
    });

    it("Não deve ser capaz de listar os lojistas se o token estiver inválido ou expirado", async () => {
        const response = await request(app)
            .get("/lojistas")
            .set({ Authorization: `Bearer 111` });

        expect(response.body.message).toBe("Invalid Token");
    });

    it("Deve ser capaz de listar os lojistas por pagina", async () => {
        const responseToken = await request(app)
            .post("/sessions")
            .send({ username: "admin", senha: "admin" });

        const { token } = responseToken.body;

        const response = await request(app)
            .get(`/lojistas?page=1&perPage=1`)
            .set({ Authorization: `Bearer ${token}` });

        expect(response.status).toBe(201);
        expect(response.body).toHaveLength(1);
    });
});
