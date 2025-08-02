import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/create-trip.dto';

@Injectable()
export class TripsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async create(createTripDto: CreateTripDto, userId: string) {
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase
      .from('trips')
      .insert([{ ...createTripDto, user_id: userId }])
      .select()
      .single();

    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    return data;
  }

  async findAll(userId: string, favorite?: boolean) {
    const supabase = this.supabaseService.getClient();
    let query = supabase
      .from('trips')
      .select('id, plan_result, is_favorite, prompt_data, ai_prompt, created_at')
      .eq('user_id', userId);

    if (favorite !== undefined) {
      query = query.eq('is_favorite', favorite);
    }

    const { data, error } = await query.order('is_favorite', { ascending: false });

    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    return data;
  }

  async toggleFavorite(id: string, userId: string) {
    const supabase = this.supabaseService.getClient();
    
    // First, get the current favorite status
    const { data: currentTrip, error: fetchError } = await supabase
      .from('trips')
      .select('is_favorite')
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (fetchError) {
      throw new InternalServerErrorException(fetchError.message);
    }

    if (!currentTrip) {
      throw new NotFoundException(`Trip with ID ${id} not found.`);
    }

    // Toggle the favorite status
    const newFavoriteStatus = !currentTrip.is_favorite;
    
    const { data, error } = await supabase
      .from('trips')
      .update({ is_favorite: newFavoriteStatus })
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    
    return data;
  }

  async remove(id: string, userId: string) {
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase
      .from('trips')
      .delete()
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    if (!data) {
      throw new NotFoundException(`Trip with ID ${id} not found.`);
    }
    return { message: 'Trip successfully deleted.' };
  }
}
