import { PrismaClient } from "@prisma/client";
import { Console } from "console";

const prisma = new PrismaClient();
const PRESIDENT25_ID="election-2025-president";

async function seedElections() {
    const election25 = await prisma.election.upsert({
        where: {id: 'election-2025'},
        update: {},
        create: {
            id: 'election-2025',
            name: 'Election 2025',
            startDate: new Date('2025-05-26T00:00:00Z'),
            endDate: new Date('2025-06-26T23:59:59Z'),
            description: 'University Student Council Election 2025',
            isActive: true
        }
    })

    await prisma.position.upsert({
        where: {id: PRESIDENT25_ID },
        update: {},
        create: {
            id: PRESIDENT25_ID,
            title: "President",
            Election: {
                connect: {
                    id: election25.id
                }
            }
        }
    })
}

async function main() {
    console.log("SEEDING DATABASE...");

    await seedElections();

    console.log("FINISHED SEEDING");
}

void main()