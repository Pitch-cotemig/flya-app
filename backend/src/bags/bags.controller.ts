import { Controller, Get, Post, Body, Patch, Param, UseGuards, Request, HttpException, HttpStatus } from '@nestjs/common';
import { BagsService } from './bags.service';
import { CreateBagDto } from './dto/create-bag.dto';
import { UpdateBagDto } from './dto/update-bag.dto';
import { JwtGuard } from '../auth/jwt.guard';

@Controller('bags')
@UseGuards(JwtGuard)
export class BagsController {
  constructor(private readonly bagsService: BagsService) {}

  @Post()
  async create(@Body() createBagDto: CreateBagDto, @Request() req) {
    try {
      const userId = req.user?.sub || req.user?.id;
      
      if (!userId) {
        throw new HttpException({
          message: 'Usuário não autenticado',
          error: 'Token JWT inválido ou ausente'
        }, HttpStatus.UNAUTHORIZED);
      }
      
      return await this.bagsService.create(createBagDto, userId);
    } catch (error) {
      throw new HttpException({
        message: 'Erro ao criar bagagem',
        error: error?.message || 'Erro interno do servidor'
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('trip/:tripId')
  async findByTrip(@Param('tripId') tripId: string, @Request() req) {
    try {
      const userId = req.user?.sub || req.user?.id;
      if (!userId) {
        throw new HttpException({
          message: 'Usuário não autenticado',
          error: 'Token JWT inválido ou ausente'
        }, HttpStatus.UNAUTHORIZED);
      }
      return await this.bagsService.findByTripAndUser(tripId, userId);
    } catch (error) {
      throw new HttpException({
        message: 'Erro ao buscar bagagem da viagem',
        error: error.message || 'Erro interno do servidor'
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBagDto: UpdateBagDto, @Request() req) {
    try {
      const userId = req.user?.sub || req.user?.id;
      return await this.bagsService.update(id, updateBagDto, userId);
    } catch (error) {
      throw new HttpException({
        message: 'Erro ao atualizar bagagem',
        error: error.message || 'Erro interno do servidor'
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}