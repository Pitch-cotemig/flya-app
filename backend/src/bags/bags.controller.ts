import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, HttpException, HttpStatus } from '@nestjs/common';
import { BagsService } from './bags.service';
import { CreateBagDto, BagItem } from './dto/create-bag.dto';
import { UpdateBagDto } from './dto/update-bag.dto';
import { JwtGuard } from '../auth/jwt.guard';

@Controller('bags')
@UseGuards(JwtGuard)
export class BagsController {
  constructor(private readonly bagsService: BagsService) {}

  @Post()
  async create(@Body() createBagDto: CreateBagDto, @Request() req) {
    try {
      console.log('=== DEBUG CREATE BAG ===');
      console.log('Request user object:', req.user);
      console.log('Request headers:', req.headers);
      console.log('DTO received:', createBagDto);
      
      const userId = req.user?.sub || req.user?.id;
      console.log('Extracted userId:', userId);
      
      if (!userId) {
        throw new HttpException({
          message: 'Usuário não autenticado',
          error: 'Token JWT inválido ou ausente',
          userObject: req.user
        }, HttpStatus.UNAUTHORIZED);
      }
      
      return await this.bagsService.create({
        ...createBagDto,
        userId: userId
      });
    } catch (error) {
      console.error('Create bag error:', error);
      throw new HttpException({
        message: 'Erro ao criar bagagem',
        error: error?.message || error?.code || JSON.stringify(error),
        originalError: error,
        requestData: createBagDto,
        userId: req.user?.sub
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
        error: error.message || 'Erro interno do servidor',
        tripId: tripId
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBagDto: UpdateBagDto) {
    try {
      return await this.bagsService.update(id, updateBagDto);
    } catch (error) {
      throw new HttpException({
        message: 'Erro ao atualizar bagagem',
        error: error.message || 'Erro interno do servidor',
        bagId: id
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post(':id/items')
  async addItem(@Param('id') id: string, @Body() item: BagItem) {
    try {
      console.log('AddItem - ID:', id, 'Item:', item);
      const result = await this.bagsService.addItem(id, item);
      console.log('AddItem - Success:', result);
      return result;
    } catch (error) {
      console.error('AddItem - Controller Error:', error);
      throw new HttpException({
        message: 'Erro ao adicionar item na bagagem',
        error: error.message || 'Erro interno do servidor',
        details: error,
        bagId: id,
        item: item
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id/items/:itemId')
  async removeItem(@Param('id') id: string, @Param('itemId') itemId: string) {
    try {
      return await this.bagsService.removeItem(id, itemId);
    } catch (error) {
      throw new HttpException({
        message: 'Erro ao remover item da bagagem',
        error: error.message || 'Erro interno do servidor',
        bagId: id,
        itemId: itemId
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id/items/:itemId/toggle')
  async toggleItemPacked(@Param('id') id: string, @Param('itemId') itemId: string) {
    try {
      return await this.bagsService.toggleItemPacked(id, itemId);
    } catch (error) {
      throw new HttpException({
        message: 'Erro ao marcar/desmarcar item como empacotado',
        error: error.message || 'Erro interno do servidor',
        bagId: id,
        itemId: itemId
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}