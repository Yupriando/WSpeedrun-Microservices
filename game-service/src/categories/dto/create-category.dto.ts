import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: '2107b522-70d4-47ee-b5d6-155856c447a1',
  })
  @IsString()
  game_id!: string;

  @ApiProperty({
    example: 'Any%',
  })
  @IsString()
  run_category_name!: string;
}
