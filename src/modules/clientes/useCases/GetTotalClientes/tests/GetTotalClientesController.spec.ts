/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { app } from "@shared/infra/http/app";
import request from "supertest";

describe("CLIENTE - Get Total Clientes Controller", () => {
    it("Deve ser capaz de retornar o total de clientes", async () => {
        const responseToken = await request(app)
            .post("/sessions")
            .send({ username: "admin", senha: "admin" });

        const { token } = responseToken.body;

        const response = await request(app)
            .get("/clientes/gettotalclientes")
            .set({ Authorization: `Bearer ${token}` });

        expect(response.status).toBe(200);
        expect(response.body).toBe("2");
    });

    it("Não deve ser capaz de retornar o total de clientes se não estiver logado", async () => {
        const response = await request(app).get("/clientes/gettotalclientes");

        expect(response.body.message).toBe("Token missing");
    });

    it("Não deve ser capaz de mostar o total de clientes se o token estiver inválido ou expirado", async () => {
        const response = await request(app)
            .get("/clientes/gettotalclientes")
            .set({ Authorization: `Bearer 111` });

        expect(response.body.message).toBe("Invalid Token");
    });
});
