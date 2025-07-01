import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) { }

  async signup(nome: string, email: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({ data: { nome, email, password: hashed } });
    return {
      success: true,
      data: {
        user: {
          id: user.id,
          nome: user.nome,
          email: user.email,
        },
      },
      message: 'User created',
    };
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = jwt.sign(
      { sub: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' },
    );

    return {
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          nome: user.nome,
          email: user.email,
        },
      },
    };
  }
}
