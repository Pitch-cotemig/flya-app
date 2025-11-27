import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
  Patch,
} from '@nestjs/common';
import { TripsService } from '../services/trips-service';
import { CreateTripDto } from '../dtos/trips/trips-dto';
import { JwtGuard } from 'src/middlewares/auth/jwt.guard';

@UseGuards(JwtGuard)
@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Post()
  create(@Body() createTripDto: CreateTripDto, @Req() req) {
    const userId = req.user.id;
    return this.tripsService.create(createTripDto, userId);
  }

  @Get()
  findAll(@Req() req, @Query('favorite') favorite?: string) {
    const userId = req.user.id;
    const favoriteFilter =
      favorite === 'true' ? true : favorite === 'false' ? false : undefined;
    return this.tripsService.findAll(userId, favoriteFilter);
  }

  @Patch(':id/favorite')
  toggleFavorite(@Param('id') id: string, @Req() req) {
    const userId = req.user.id;
    return this.tripsService.toggleFavorite(id, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    const userId = req.user.id;
    return this.tripsService.remove(id, userId);
  }
}
