import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { v4 as uuidv4 } from 'uuid';

import { CreateRunDto } from './dto/create-run.dto';

@Injectable()
export class RunsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateRunDto, userId: string) {
    const run = await this.prisma.runs.create({
      data: {
        run_id: uuidv4(),
        run_category_id: dto.run_category_id,
        user_id: userId,
        vod_url: dto.vod_url,
        run_duration: dto.run_duration,
        submitted_at: new Date(),
        status: 'PENDING',
      },
    });

    return {
      ...run,
      run_duration: Number(run.run_duration),
    };
  }

  async findAll() {
    return this.prisma.runs.findMany({
      orderBy: {
        submitted_at: 'desc',
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.runs.findUnique({
      where: {
        run_id: id,
      },
    });
  }

  async findMyRuns(userId: string) {
    return this.prisma.runs.findMany({
      where: {
        user_id: userId,
      },
      orderBy: {
        submitted_at: 'desc',
      },
    });
  }

  async verify(id: string) {
    return this.prisma.runs.update({
      where: {
        run_id: id,
      },
      data: {
        status: 'VERIFIED',
        verified_at: new Date(),
      },
    });
  }

  async reject(id: string) {
    return this.prisma.runs.update({
      where: {
        run_id: id,
      },
      data: {
        status: 'REJECTED',
      },
    });
  }

  async getLeaderboard(categoryId: string) {
    const runs = await this.prisma.runs.findMany({
      where: {
        run_category_id: categoryId,
        status: 'VERIFIED',
      },
      orderBy: {
        run_duration: 'asc',
      },
    });

    return runs.map((run, index) => ({
      rank: index + 1,
      ...run,
      run_duration: Number(run.run_duration),
    }));
  }
}
