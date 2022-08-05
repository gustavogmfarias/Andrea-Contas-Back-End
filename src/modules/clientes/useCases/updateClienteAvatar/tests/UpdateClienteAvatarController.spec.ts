/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { app } from "@shared/infra/http/app";
import request from "supertest";
import fs from "mz/fs";
import { AppError } from "@shared/errors/AppError";

let testFilePath = null;

describe("CLIENTE - Update Avatar Cliente Controller", () => {
    it("Deve ser capaz de atualizar um avatar de um Cliente", async () => {
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

        let filePath = `${__dirname}/testFilePath.jpg`;
        let clienteAtualizado;

        await fs.exists(filePath).then(async (exists) => {
            if (!exists) throw new AppError("file does not exist");

            clienteAtualizado = await request(app)
                .patch(`/clientes/avatar/${clienteNovo.body[0].id}`)
                .set({ Authorization: `Bearer ${token}` })
                .attach("avatar", filePath)
                .then((res) => {
                    const { success, message } = res.body;
                    filePath = res.body;
                    expect(success).toBeTruthy();
                    expect(message).toBe("Uploaded successfully");
                    expect(typeof filePath).toBeTruthy();

                    testFilePath = filePath;
                    const clienteAtualizadoBody = clienteAtualizado.body;
                    expect(clienteAtualizado.status).toBe(200);
                    expect(clienteAtualizadoBody.avatarUrl).not.toBe(null);
                })
                .catch((err) => console.log(err));
        });

        await request(app)
            .delete(`/clientes/${clienteNovo.body[0].id}`)
            .set({ Authorization: `Bearer ${token}` });
    });
});
