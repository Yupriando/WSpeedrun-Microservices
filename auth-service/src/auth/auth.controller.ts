import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';

@ApiTags('Authentication')
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({
    summary: 'Register new user',
  })
  @Post('auth/register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @ApiOperation({
    summary: 'Login user',
  })
  @Post('auth/login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get current authenticated user',
  })
  @Get('auth/me')
  @UseGuards(JwtAuthGuard)
  getMe(@Req() req: any) {
    return req.user;
  }

  @ApiOperation({
    summary: 'Get user profile by id',
  })
  @Get('users/:id/profile')
  getProfile(@Param('id') id: string) {
    return this.authService.getProfile(id);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Admin test endpoint',
  })
  @Get('auth/admin-test')
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles('ADMIN')
  adminTest() {
    return {
      message: 'Only ADMIN can access this',
    };
  }
}