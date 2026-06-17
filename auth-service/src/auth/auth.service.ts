import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
  private prisma: PrismaService,
  private jwtService: JwtService,
) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.users.findUnique({
      where: {
        email: dto.email,
      },
    });

const atCount = dto.email.split('@').length - 1;

if (atCount !== 1) {
  throw new BadRequestException(
    'Email must contain exactly one @',
  );
}

if (!dto.email.includes('.')) {
  throw new BadRequestException(
    'Email must contain at least one dot',
  );
}

if (dto.email.includes('@.')) {
  throw new BadRequestException(
    '@ and . cannot be adjacent',
  );
}

const hasUppercase = /[A-Z]/.test(dto.password);
const hasLowercase = /[a-z]/.test(dto.password);
const hasNumber = /[0-9]/.test(dto.password);
const hasSpecial = /[^A-Za-z0-9]/.test(dto.password);

if (
  !hasUppercase ||
  !hasLowercase ||
  !hasNumber ||
  !hasSpecial
) {
  throw new BadRequestException(
    'Password must contain uppercase, lowercase, number, and special character',
  );
}

    if (existingUser) {
      throw new BadRequestException(
        'Email already registered',
      );
    }

    const hashedPassword = await bcrypt.hash(
      dto.password,
      10,
    );

    await this.prisma.users.create({
      data: {
        user_id: uuidv4(),
        username: dto.username,
        email: dto.email,
        password: hashedPassword,
        country: dto.country,
        role: 'USER',
      },
    });

    return {
      message: 'Register success',
    };
  }

  async login(dto: LoginDto) {
  const user = await this.prisma.users.findUnique({
    where: {
      email: dto.email,
    },
  });

  if (!user) {
    throw new UnauthorizedException(
      'Invalid email or password',
    );
  }

  const isMatch = await bcrypt.compare(
    dto.password,
    user.password,
  );

  if (!isMatch) {
    throw new UnauthorizedException(
      'Invalid email or password',
    );
  }

  const payload = {
    id: user.user_id,
    role: user.role,
  };

  return {
    access_token: this.jwtService.sign(payload),
  };
}

async getProfile(id: string) {
  const user = await this.prisma.users.findUnique({
    where: {
      user_id: id,
    },
  });

  if (!user) {
    throw new BadRequestException(
      'User not found',
    );
  }

  return {
    username: user.username,
    email: user.email,
    country: user.country,
    role: user.role,
  };
}
}