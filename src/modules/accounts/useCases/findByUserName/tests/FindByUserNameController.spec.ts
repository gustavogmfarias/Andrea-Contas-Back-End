/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { app } from "@shared/infra/http/app";
import request from "supertest";

describe("LOJISTA - Find by Username Controller", () => {
    it("Deve ser capaz de buscar o lojista por username", async () => {
        const responseToken = await request(app)
            .post("/sessions")
            .send({ username: "admin", senha: "admin" });
        const { token } = responseToken.body;

        const response = await request(app)
            .get(`/lojistas/findbyusername`)
            .send({ username: "admin" })
            .set({ Authorization: `Bearer ${token}` });

        const { username } = response.body;

        expect(response.status).toBe(200);
        expect(response.body.username).toBe("admin");
    });

    it("Não deve ser capaz de buscar o lojista por username se não estiver logado", async () => {
        const response = await request(app)
            .get(`/lojistas/findbyusername`)
            .send({ username: "admin" });

        expect(response.body.message).toBe("Token missing");
    });

    it("Não deve ser capaz de buscar o lojista por username se o token estiver inválido ou expirado", async () => {
        const response = await request(app)
            .get(`/lojistas/findbyusername`)
            .send({ username: "admin" })
            .set({ Authorization: `Bearer 111` });

        expect(response.body.message).toBe("Invalid Token");
    });
});
