import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty({
    example: '2107b522-70d4-47ee-b5d6-155856c447a1',
    required: false,
  })
  @IsOptional()
  @IsString()
  game_id?: string;

  @ApiProperty({
    example: '100%',
    required: false,
  })
  @IsOptional()
  @IsString()
  run_category_name?: string;
}
