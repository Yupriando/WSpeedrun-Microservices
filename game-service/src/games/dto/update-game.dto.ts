import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateGameDto {
  @ApiProperty({
    example: 'Celeste',
    required: false,
  })
  @IsOptional()
  @IsString()
  game_name?: string;

  @ApiProperty({
    example: 'Platformer Game',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}
