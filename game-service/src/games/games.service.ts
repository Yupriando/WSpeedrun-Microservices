import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { v4 as uuidv4 } from 'uuid';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Injectable()
export class GamesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateGameDto) {
    return this.prisma.games.create({
      data: {
        game_id: uuidv4(),
        game_name: dto.game_name,
        description: dto.description,
      },
    });
  }

  async findAll() {
    return this.prisma.games.findMany({
      orderBy: {
        game_name: 'asc',
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.games.findUnique({
      where: {
        game_id: id,
      },
      include: {
        run_categories: true,
      },
    });
  }

  async update(id: string, dto: UpdateGameDto) {
    return this.prisma.games.update({
      where: {
        game_id: id,
      },
      data: dto,
    });
  }

  async remove(id: string) {
    return this.prisma.games.delete({
      where: {
        game_id: id,
      },
    });
  }

  async getCategories(gameId: string) {
    return this.prisma.run_categories.findMany({
      where: {
        game_id: gameId,
      },
      orderBy: {
        run_category_name: 'asc',
      },
    });
  }
}
