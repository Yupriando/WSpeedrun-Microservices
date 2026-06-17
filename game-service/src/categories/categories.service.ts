import { BadRequestException, Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { v4 as uuidv4 } from 'uuid';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCategoryDto) {
    const game = await this.prisma.games.findUnique({
      where: {
        game_id: dto.game_id,
      },
    });

    if (!game) {
      throw new BadRequestException('Game not found');
    }

    return this.prisma.run_categories.create({
      data: {
        run_category_id: uuidv4(),
        game_id: dto.game_id,
        run_category_name: dto.run_category_name,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.run_categories.findUnique({
      where: {
        run_category_id: id,
      },
      include: {
        game: true,
      },
    });
  }

  async update(id: string, dto: UpdateCategoryDto) {
    return this.prisma.run_categories.update({
      where: {
        run_category_id: id,
      },
      data: dto,
    });
  }

  async remove(id: string) {
    return this.prisma.run_categories.delete({
      where: {
        run_category_id: id,
      },
    });
  }

  async findAll() {
    return this.prisma.run_categories.findMany({
      include: {
        game: true,
      },
      orderBy: {
        run_category_name: 'asc',
      },
    });
  }
}
