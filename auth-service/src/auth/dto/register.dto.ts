import {
  IsString,
  Length,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    example: 'name',
  })
  @IsString()
  @Length(4, 40)
  username!: string;

  @ApiProperty({
    example: 'example@gmail.com',
  })
  @IsString()
  email!: string;

  @ApiProperty({
    example: 'Indonesia',
  })
  @IsString()
  country!: string;

  @ApiProperty({
    example: 'Password123!',
  })
  @IsString()
  @Length(8, 40)
  password!: string;
}