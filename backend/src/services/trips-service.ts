import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { TripsRepository } from '../repositories/supabase/trips-repository';
import { CreateTripDto } from '../dtos/trips/trips-dto';

@Injectable()
export class TripsService {
  constructor(private readonly tripsRepository: TripsRepository) {}

  async create(createTripDto: CreateTripDto, userId: string) {
    const { data, error } = await this.tripsRepository.create(createTripDto, userId);

    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    return data;
  }

  async findAll(userId: string, favorite?: boolean) {
    const { data, error } = await this.tripsRepository.findAll(userId, favorite);

    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    return data;
  }

  async toggleFavorite(id: string, userId: string) {
    const { data: currentTrip, error: fetchError } = await this.tripsRepository.findById(id, userId);

    if (fetchError) {
      throw new InternalServerErrorException(fetchError.message);
    }

    if (!currentTrip) {
      throw new NotFoundException(`Trip with ID ${id} not found.`);
    }

    const newFavoriteStatus = !currentTrip.is_favorite;
    const { data, error } = await this.tripsRepository.updateFavorite(id, userId, newFavoriteStatus);

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    return data;
  }

  async remove(id: string, userId: string) {
    const { data, error } = await this.tripsRepository.delete(id, userId);

    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    if (!data) {
      throw new NotFoundException(`Trip with ID ${id} not found.`);
    }
    return { message: 'Trip successfully deleted.' };
  }
}
