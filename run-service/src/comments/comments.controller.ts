import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CommentsService } from './comments.service';

import { CreateCommentDto } from './dto/create-comment.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Comments')
@Controller()
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiBearerAuth()
  @Post('runs/:id/comments')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Add comment',
  })
  create(
    @Param('id') runId: string,
    @Body() dto: CreateCommentDto,
    @Req() req,
  ) {
    return this.commentsService.create(runId, req.user.id, dto);
  }

  @Get('runs/:id/comments')
  @ApiOperation({
    summary: 'Get comments by run',
  })
  findByRun(@Param('id') runId: string) {
    return this.commentsService.findByRun(runId);
  }

  @ApiBearerAuth()
  @Delete('comments/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiOperation({
    summary: 'Delete comment (ADMIN)',
  })
  remove(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }
}
