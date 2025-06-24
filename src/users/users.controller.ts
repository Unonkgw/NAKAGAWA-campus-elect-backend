import { Get, Query, Post, Body, Controller } from '@nestjs/common';
import { UsersService } from 'src/users/users.service'
import { ApiOperation, ApiResponse, ApiTags, ApiQuery, ApiBody } from '@nestjs/swagger';
import { ReturnedStudentDto } from 'src/users/dto/students.dto';
import { Student } from '@prisma/client';
import { CreateStudentDto } from 'src/users/dto/createstudent.dto';


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

    @Post('students')
    @ApiOperation({
        summary: 'Create a new student',
        description: 'Creates a new student using the request body.',
    })
    @ApiBody({ type: CreateStudentDto })
    @ApiResponse({
        status: 201,
        description: 'Student created successfully.',
        type: ReturnedStudentDto,
    })
    @ApiResponse({
        status: 400,
        description: 'Invalid input.',
    })
    async createStudent(
    @Body() createStudentDto: CreateStudentDto,
    ): Promise<Student> {
        return await this.usersService.createStudent(createStudentDto);
    }
}
