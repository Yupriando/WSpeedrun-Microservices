import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { v4 as uuidv4 } from 'uuid';

import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async create(runId: string, userId: string, dto: CreateCommentDto) {
    return this.prisma.comments.create({
      data: {
        comment_id: uuidv4(),
        run_id: runId,
        user_id: userId,
        comment: dto.comment,
        created_at: new Date(),
      },
    });
  }

  async findByRun(runId: string) {
    return this.prisma.comments.findMany({
      where: {
        run_id: runId,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async remove(id: string) {
    return this.prisma.comments.delete({
      where: {
        comment_id: id,
      },
    });
  }
}
