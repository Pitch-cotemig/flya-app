import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateBagDto, BagItem } from './dto/create-bag.dto';
import { UpdateBagDto } from './dto/update-bag.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class BagsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async create(createBagDto: CreateBagDto) {
    try {
      console.log('Service create - DTO:', createBagDto);
      const supabase = this.supabaseService.getClient();
      
      const insertData = {
        trip_id: createBagDto.tripId,
        user_id: createBagDto.userId,
        items: createBagDto.items || []
      };
      console.log('Insert data:', insertData);
      
      const { data, error } = await supabase
        .from('bags')
        .insert(insertData)
        .select()
        .single();

      console.log('Supabase result:', { data, error });
      if (error) {
        console.error('Supabase error:', error);
        throw new Error(`Database error: ${error.message || JSON.stringify(error)}`);
      }
      return data;
    } catch (err) {
      console.error('Service create error:', err);
      throw err;
    }
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
    try {
      console.log('Service addItem - bagId:', bagId, 'item:', item);
      const supabase = this.supabaseService.getClient();
      
      const { data: bag, error: fetchError } = await supabase
        .from('bags')
        .select('items')
        .eq('id', bagId)
        .single();

      console.log('Fetch bag result:', { bag, fetchError });
      if (fetchError) {
        console.error('Fetch error:', fetchError);
        throw new Error(`Fetch error: ${JSON.stringify(fetchError)}`);
      }

      const items = bag.items || [];
      const newItem = { ...item, id: randomUUID() };
      items.push(newItem);
      console.log('Items after push:', items);

      const { data, error } = await supabase
        .from('bags')
        .update({ items })
        .eq('id', bagId)
        .select()
        .single();

      console.log('Update result:', { data, error });
      if (error) {
        console.error('Update error:', error);
        throw new Error(`Update error: ${JSON.stringify(error)}`);
      }
      return data;
    } catch (err) {
      console.error('AddItem service error:', err);
      throw err;
    }
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