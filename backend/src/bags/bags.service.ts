import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateBagDto, BagItem } from './dto/create-bag.dto';
import { UpdateBagDto } from './dto/update-bag.dto';

@Injectable()
export class BagsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async create(createBagDto: CreateBagDto) {
    const supabase = this.supabaseService.getClient();
    
    const { data, error } = await supabase
      .from('bags')
      .insert({
        trip_id: createBagDto.tripId,
        user_id: createBagDto.userId,
        items: createBagDto.items || []
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async findByTripAndUser(tripId: string, userId: string) {
    const supabase = this.supabaseService.getClient();
    
    const { data, error } = await supabase
      .from('bags')
      .select('*')
      .eq('trip_id', tripId)
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async update(id: string, updateBagDto: UpdateBagDto) {
    const supabase = this.supabaseService.getClient();
    
    const { data, error } = await supabase
      .from('bags')
      .update({
        items: updateBagDto.items
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async addItem(bagId: string, item: BagItem) {
    const supabase = this.supabaseService.getClient();
    
    const { data: bag, error: fetchError } = await supabase
      .from('bags')
      .select('items')
      .eq('id', bagId)
      .single();

    if (fetchError) throw fetchError;

    const items = bag.items || [];
    items.push({ ...item, id: crypto.randomUUID() });

    const { data, error } = await supabase
      .from('bags')
      .update({ items })
      .eq('id', bagId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async removeItem(bagId: string, itemId: string) {
    const supabase = this.supabaseService.getClient();
    
    const { data: bag, error: fetchError } = await supabase
      .from('bags')
      .select('items')
      .eq('id', bagId)
      .single();

    if (fetchError) throw fetchError;

    const items = (bag.items || []).filter((item: BagItem) => item.id !== itemId);

    const { data, error } = await supabase
      .from('bags')
      .update({ items })
      .eq('id', bagId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async toggleItemPacked(bagId: string, itemId: string) {
    const supabase = this.supabaseService.getClient();
    
    const { data: bag, error: fetchError } = await supabase
      .from('bags')
      .select('items')
      .eq('id', bagId)
      .single();

    if (fetchError) throw fetchError;

    const items = (bag.items || []).map((item: BagItem) => 
      item.id === itemId ? { ...item, packed: !item.packed } : item
    );

    const { data, error } = await supabase
      .from('bags')
      .update({ items })
      .eq('id', bagId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}