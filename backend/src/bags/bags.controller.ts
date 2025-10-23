import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { BagsService } from './bags.service';
import { CreateBagDto, BagItem } from './dto/create-bag.dto';
import { UpdateBagDto } from './dto/update-bag.dto';
import { JwtGuard } from '../auth/jwt.guard';

@Controller('bags')
@UseGuards(JwtGuard)
export class BagsController {
  constructor(private readonly bagsService: BagsService) {}

  @Post()
  create(@Body() createBagDto: CreateBagDto, @Request() req) {
    return this.bagsService.create({
      ...createBagDto,
      userId: req.user.sub
    });
  }

  @Get('trip/:tripId')
  findByTrip(@Param('tripId') tripId: string, @Request() req) {
    return this.bagsService.findByTripAndUser(tripId, req.user.sub);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBagDto: UpdateBagDto) {
    return this.bagsService.update(id, updateBagDto);
  }

  @Post(':id/items')
  addItem(@Param('id') id: string, @Body() item: BagItem) {
    return this.bagsService.addItem(id, item);
  }

  @Delete(':id/items/:itemId')
  removeItem(@Param('id') id: string, @Param('itemId') itemId: string) {
    return this.bagsService.removeItem(id, itemId);
  }

  @Patch(':id/items/:itemId/toggle')
  toggleItemPacked(@Param('id') id: string, @Param('itemId') itemId: string) {
    return this.bagsService.toggleItemPacked(id, itemId);
  }
}