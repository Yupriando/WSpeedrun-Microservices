import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { RunsService } from './runs.service';

import { CreateRunDto } from './dto/create-run.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { Roles } from '../auth/decorators/roles.decorator';

import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('Runs')
@Controller()
export class RunsController {
  constructor(private readonly runsService: RunsService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Submit run',
  })
  @Post('runs')
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateRunDto, @Req() req) {
    return this.runsService.create(dto, req.user.id);
  }

  @Get('runs')
  @ApiOperation({
    summary: 'Get all runs',
  })
  findAll() {
    return this.runsService.findAll();
  }

  @ApiBearerAuth()
  @Get('runs/me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Get my runs',
  })
  findMyRuns(@Req() req) {
    return this.runsService.findMyRuns(req.user.id);
  }

  @Get('runs/:id')
  @ApiOperation({
    summary: 'Get run detail',
  })
  findOne(@Param('id') id: string) {
    return this.runsService.findOne(id);
  }

  @Patch('admin/runs/:id/verify')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Verify run (ADMIN)',
  })
  verify(@Param('id') id: string) {
    return this.runsService.verify(id);
  }

  @Patch('admin/runs/:id/reject')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Reject run (ADMIN)',
  })
  reject(@Param('id') id: string) {
    return this.runsService.reject(id);
  }

  @Get('leaderboard/:categoryId')
  @ApiOperation({
    summary: 'Get leaderboard by category',
  })
  getLeaderboard(
    @Param('categoryId')
    categoryId: string,
  ) {
    return this.runsService.getLeaderboard(categoryId);
  }
}
