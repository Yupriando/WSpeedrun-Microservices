import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateRunDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsString()
  run_category_id!: string;

  @ApiProperty({
    example: 'https://youtube.com/watch?v=123',
  })
  @IsString()
  vod_url!: string;

  @ApiProperty({
    example: 12345,
  })
  @IsNumber()
  run_duration!: number;
}
