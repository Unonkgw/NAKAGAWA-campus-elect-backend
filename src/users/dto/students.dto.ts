import { ApiProperty } from '@nestjs/swagger';
import { Student, Role } from '@prisma/client';

export class ReturnedStudentDto implements Partial<Student> {
  @ApiProperty({
    description: 'Unique identifier for the student',
    example: '123abc',
  })
  studentId: string;

  @ApiProperty({
    description: 'Department the student belongs to',
    example: 'Computer Science',
  })
  department: string;

  @ApiProperty({
    description: "Student's assigned email",
    example: 'hybnakagawa@addu.edu.ph',
  })
  email: string;

  @ApiProperty({
    description: 'Name of the student',
    example: 'Honeydei Yssabelle Nakagawa',
  })
  name: string;

  @ApiProperty({
    description: 'Role of the student',
    enum: Role,
    example: Role.STUDENT,
  })
  role: Role;
}
