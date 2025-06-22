import { Get, Query, Controller } from '@nestjs/common';
import { UsersService } from 'src/users/users.service'
import { ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { ReturnedStudentDto } from 'src/users/dto/students.dto';
import { Student } from '@prisma/client';


@ApiTags('Students')
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
    @ApiResponse({
        status: 500,
        description: "There's something wrong.",
    })
    async findAllStudents(): Promise<Student[]> { 
        return await this.usersService.findAllStudents();
    }
    
    @Get('students/find')
    @ApiOperation({
    summary: 'Get one student',
    description:
      'Looks up a single student by their unique **studentId** and returns the full record.',
    })
    @ApiQuery({
        name: 'id',
        type: String,              
        required: true,
        description: 'The studentId of the student you want to retrieve.', 
        example: 's1',   
    })
    @ApiResponse({
        status: 200,
        description: 'Student found.',
        type: ReturnedStudentDto,
    })
    @ApiResponse({
        status: 404, 
        description: 'Student not found.' 
    })
    @ApiResponse({ 
        status: 500, 
        description: 'Server error.' 
    })
    async findStudentsById(
        @Query('id') id: Student['studentId']
    ) {
        return await this.usersService.findStudentById({
            id: id
        })
    }
}
