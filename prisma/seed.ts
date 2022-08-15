import { PrismaClient, Prisma } from "@prisma/client";
import { hash } from "bcryptjs";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

const prisma = new PrismaClient();
const dateProvider = new DayjsDateProvider();

async function main() {
    const passwordAdmin = await hash("admin", 12);
    const passwordLojista = await hash("gustavo", 12);

    const lojista1 = await prisma.lojista.create({
        data: { username: "admin", nome: "admin", senha: passwordAdmin },
    });
    const lojista2 = await prisma.lojista.create({
        data: { username: "gustavo", nome: "gustavo", senha: passwordLojista },
    });

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

    const conta1 = await prisma.conta.create({
        data: {
            criadoEm: this.dateProvider.convertToUtc3Hours(new Date()),
            editadoEm: this.dateProvider.convertToUtc3Hours(new Date()),
            observacoes: "Conta 1",
            numeroParcelas: 12,
            numeroParcelasAtual: 12,
            valorInicial: 120,
            valorParcela: 10,
            valorAtual: 120,
            dataVencimentoInicial: this.dateProvider.addDays(30),
            dataVencimentoAtual: this.dateProvider.addDays(30),
            dataVencimentoFinal: this.dateProvider.addMonths(
                this.dateProvider.addDays(30),
                12
            ),
            fkIdLojista: lojista1.id,
            fkIdCliente: cliente1.id,
        },
    });

    const conta2 = await prisma.conta.create({
        data: {
            criadoEm: this.dateProvider.convertToUtc3Hours(new Date()),
            editadoEm: this.dateProvider.convertToUtc3Hours(new Date()),
            observacoes: "Conta 1",
            numeroParcelas: 10,
            numeroParcelasAtual: 10,
            valorInicial: 100,
            valorParcela: 10,
            valorAtual: 100,
            dataVencimentoInicial: this.dateProvider.addDays(30),
            dataVencimentoAtual: this.dateProvider.addDays(30),
            dataVencimentoFinal: this.dateProvider.addMonths(
                this.dateProvider.addDays(30),
                10
            ),
            fkIdLojista: lojista2.id,
            fkIdCliente: cliente2.id,
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
