import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateGameDto {
  @ApiProperty({
    example: 'Minecraft',
  })
  @IsString()
  game_name!: string;

  @ApiProperty({
    example: 'Sandbox game',
  })
  @IsString()
  description!: string;
}
