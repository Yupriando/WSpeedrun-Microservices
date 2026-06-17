import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Games')
@Controller()
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @ApiOperation({
    summary: 'Get all games',
  })
  @Get('games')
  findAll() {
    return this.gamesService.findAll();
  }

  @ApiOperation({
    summary: 'Get game by id',
  })
  @Get('games/:id')
  findOne(@Param('id') id: string) {
    return this.gamesService.findOne(id);
  }

  @ApiOperation({
    summary: 'Get all categories for a game',
  })
  @Get('games/:id/categories')
  getCategories(@Param('id') id: string) {
    return this.gamesService.getCategories(id);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create game (ADMIN)',
  })
  @Post('admin/games')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  create(@Body() dto: CreateGameDto) {
    return this.gamesService.create(dto);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update game (ADMIN)',
  })
  @Patch('admin/games/:id/update')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  update(@Param('id') id: string, @Body() dto: UpdateGameDto) {
    return this.gamesService.update(id, dto);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete game (ADMIN)',
  })
  @Delete('admin/games/:id/delete')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.gamesService.remove(id);
  }
}
