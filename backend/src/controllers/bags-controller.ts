import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BagsService } from '../services/bags-service';
import { CreateBagDto } from '../dtos/bags/create-bag-dto';
import { UpdateBagDto } from '../dtos/bags/update-bag-dto';
import { JwtGuard } from '../middlewares/auth/jwt.guard';

@Controller('bags')
@UseGuards(JwtGuard)
export class BagsController {
  constructor(private readonly bagsService: BagsService) {}

  @Post()
  async create(@Body() createBagDto: CreateBagDto, @Request() req) {
    try {
      const userId = req.user?.sub || req.user?.id;
      const accessToken = req.headers.authorization?.replace('Bearer ', '');

      if (!userId) {
        throw new HttpException(
          {
            message: 'Usuário não autenticado',
            error: 'Token JWT inválido ou ausente',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }

      return await this.bagsService.create(createBagDto, userId, accessToken);
    } catch (error) {
      throw new HttpException(
        {
          message: 'Erro ao criar bagagem',
          error: error?.message || 'Erro interno do servidor',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('trip/:tripId')
  async findByTrip(@Param('tripId') tripId: string, @Request() req) {
    try {
      const userId = req.user?.sub || req.user?.id;
      const accessToken = req.headers.authorization?.replace('Bearer ', '');
      if (!userId) {
        throw new HttpException(
          {
            message: 'Usuário não autenticado',
            error: 'Token JWT inválido ou ausente',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }
      return await this.bagsService.findByTripAndUser(
        tripId,
        userId,
        accessToken,
      );
    } catch (error) {
      throw new HttpException(
        {
          message: 'Erro ao buscar bagagem da viagem',
          error: error.message || 'Erro interno do servidor',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBagDto: UpdateBagDto,
    @Request() req,
  ) {
    try {
      const userId = req.user?.sub || req.user?.id;
      const accessToken = req.headers.authorization?.replace('Bearer ', '');
      return await this.bagsService.update(
        id,
        updateBagDto,
        userId,
        accessToken,
      );
    } catch (error) {
      throw new HttpException(
        {
          message: 'Erro ao atualizar bagagem',
          error: error.message || 'Erro interno do servidor',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
