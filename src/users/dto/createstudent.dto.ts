import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty({
    description: 'Unique student ID',
    example: 's1',
  })
  studentId: string;

  @ApiProperty({
    description: 'Student name',
    example: 'Honeydei Nakagawa',
  })
  name: string;

  @ApiProperty({
    description: 'Department name',
    example: 'Computer Science',
  })
  department: string;

  @ApiProperty({
    description: 'Email address',
    example: 'hnakagawa@addu.edu.ph',
  })
  email: string;

}
