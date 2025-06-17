import { Get } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { UsersService } from 'src/users/users.service'
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReturnedStudentDto } from 'src/users/dto/students.dto';
import { Student } from '@prisma/client';



@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Get('students')
    @ApiOperation({
        summary: "Get all students",
        description: "Returns a list of all students in the system."
    })
    @ApiResponse({
        status: 200,
        description: "List of all students retrieved successfully",
        type: [ReturnedStudentDto]
    })
    async findAllStudents(): Promise<Student[]> {
        
        return await this.usersService.findAllStudents();

    
    }
}
