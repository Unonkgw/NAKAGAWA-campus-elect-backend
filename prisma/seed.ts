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



async function seedStudents() {
    const students = [
        {
            studentId: "AdDU001",
            email: "ynakagawa@addu.edu.ph",
            name: "Yssabelle Nakagawa",
            department: "Computer Studies"
        },
        {
            studentId: "AdDU002",
            email: "ibaran@addu.edu.ph",
            name: "Isa Baran",
            department: "Computer Studies"
        },
        {
            studentId: "AdDU003",
            email: "jkim@addu.edu.ph",
            name: "Jisoo Kim",
            department: "Computer Studies"
        }
    ];

    for (const student of students) {
        await prisma.student.upsert({
            where: { studentId: student.studentId },
            update: {},
            create: student
        });

        
        if (student.studentId === "AdDU001" || student.studentId === "AdDU002") {
            await prisma.candidate.upsert({
                where: { candidateId: `cand-${student.studentId}` },
                update: {},
                create: {
                    candidateId: `cand-${student.studentId}`,
                    studentId: student.studentId,
                    positionId: "election-2025-president"
                }
            });
        }
    }
}



async function main() {
    console.log("SEEDING DATABASE...");

    await seedElections();
    await seedStudents();         

    console.log("FINISHED SEEDING");
}

void main()