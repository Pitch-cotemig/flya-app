import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../config/supabase/supabase.service';
import { CreateBagDto } from './dto/create-bag.dto';
import { UpdateBagDto } from './dto/update-bag.dto';

@Injectable()
export class BagsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async create(createBagDto: CreateBagDto, userId: string, accessToken?: string) {
    const supabase = accessToken 
      ? this.supabaseService.getClientWithAuth(accessToken)
      : this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('bags')
      .insert({
        trip_id: createBagDto.tripId,
        user_id: userId,
        items: createBagDto.items || [],
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async findByTripAndUser(tripId: string, userId: string, accessToken?: string) {
    const supabase = accessToken 
      ? this.supabaseService.getClientWithAuth(accessToken)
      : this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('bags')
      .select('*')
      .eq('trip_id', tripId)
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async update(id: string, updateBagDto: UpdateBagDto, userId: string, accessToken?: string) {
    const supabase = accessToken 
      ? this.supabaseService.getClientWithAuth(accessToken)
      : this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('bags')
      .update({ items: updateBagDto.items })
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}
