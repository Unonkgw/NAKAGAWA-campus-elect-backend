import { Injectable } from '@nestjs/common';
import { PrismaService} from 'src/prisma.service'
import { Student } from '@prisma/client';
@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService){}

/**
 * Retrieves all students from the db.
 * @returns A promise that resolves to an array of Student objects
 */

    async findAllStudents():Promise<Student[]> {
        return this.prisma.student.findMany();
    }
}
