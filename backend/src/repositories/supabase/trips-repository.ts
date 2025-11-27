import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../config/supabase/supabase.service';
import { CreateTripDto } from '../../dtos/trips/trips-dto';

@Injectable()
export class TripsRepository {
  constructor(private readonly supabaseService: SupabaseService) {}

  async create(createTripDto: CreateTripDto, userId: string) {
    const supabase = this.supabaseService.getClient();
    return await supabase
      .from('trips')
      .insert([{ ...createTripDto, user_id: userId }])
      .select()
      .single();
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

    return await query.order('is_favorite', { ascending: false });
  }

  async findById(id: string, userId: string) {
    const supabase = this.supabaseService.getClient();
    return await supabase
      .from('trips')
      .select('is_favorite')
      .eq('id', id)
      .eq('user_id', userId)
      .single();
  }

  async updateFavorite(id: string, userId: string, isFavorite: boolean) {
    const supabase = this.supabaseService.getClient();
    return await supabase
      .from('trips')
      .update({ is_favorite: isFavorite })
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single();
  }

  async delete(id: string, userId: string) {
    const supabase = this.supabaseService.getClient();
    return await supabase
      .from('trips')
      .delete()
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single();
  }
}