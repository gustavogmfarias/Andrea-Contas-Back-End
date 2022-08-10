/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { app } from "@shared/infra/http/app";
import request from "supertest";

describe("CLIENTE - List Clientes Controller", () => {
    it("Deve ser capaz de listar todos os clientes", async () => {
        const responseToken = await request(app)
            .post("/sessions")
            .send({ username: "admin", senha: "admin" });

        const { token } = responseToken.body;

        const response = await request(app)
            .get("/clientes")
            .set({ Authorization: `Bearer ${token}` });

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2);
    });

    it("Não deve ser capaz de listar os clientes se não estiver logado", async () => {
        const response = await request(app).get("/clientes");

        expect(response.body.message).toBe("Token missing");
    });

    it("Não deve ser capaz de listar os clientes se o token estiver inválido ou expirado", async () => {
        const response = await request(app)
            .get("/clientes")
            .set({ Authorization: `Bearer 111` });

        expect(response.body.message).toBe("Invalid Token");
    });

    it("Deve ser capaz de listar os clientes por pagina", async () => {
        const responseToken = await request(app)
            .post("/sessions")
            .send({ username: "admin", senha: "admin" });

        const { token } = responseToken.body;

        const response = await request(app)
            .get(`/clientes?page=1&perPage=1`)
            .set({ Authorization: `Bearer ${token}` });

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
    });
});
