import { PrismaClient, Prisma } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    const passwordAdmin = await hash("admin", 12);
    const passwordLojista = await hash("gustavo", 12);

    const lojistaData: Prisma.LojistaCreateManyInput[] = [
        {
            username: "admin",
            nome: "admin",
            senha: passwordAdmin,
        },
        {
            username: "gustavo",
            nome: "gustavo",
            senha: passwordLojista,
        },
    ];

    console.log(`Start seeding ...`);

    // eslint-disable-next-line no-restricted-syntax
    for (const u of lojistaData) {
        // eslint-disable-next-line no-await-in-loop
        const lojista = await prisma.lojista.create({
            data: u,
        });

        console.log(`Created lojista with id: ${lojista.id}`);
    }

    const cliente1 = await prisma.cliente.create({
        data: {
            nome: "Gustavo",
            sobrenome: "TEste 1",
            cpf: "222",
            email: "d@d.com",
            telefone: "2299",
            observacoes: "teste teste",
            endereco: {
                create: {
                    bairro: "cehab",
                    rua: "rua da casa",
                    cep: "4444",
                    cidade: "minha cidade",
                    estado: "rj",
                    numero: "222",
                },
            },
        },
    });

    const cliente2 = await prisma.cliente.create({
        data: {
            nome: "Andrea",
            sobrenome: "TEste 2",
            cpf: "164156165",
            email: "e@e.com",
            telefone: "55555",
            observacoes: "teste mae",
            endereco: {
                create: {
                    bairro: "bairro da mae",
                    rua: "rua da mae",
                    cep: "989898",
                    cidade: "minha cidade",
                    estado: "sp",
                    numero: "333",
                },
            },
        },
    });

    console.log(`Seeding finished.`);
}

main()
    .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
