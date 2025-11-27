import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../../config/supabase/supabase.service';

@Injectable()
export class NotificationsRepository {
  constructor(private readonly supabaseService: SupabaseService) {}

  async getNotificationSettings(userId: string) {
    const supabase = this.supabaseService.getClient();
    return await supabase
      .from('notification_settings')
      .select('*')
      .eq('user_id', userId)
      .single();
  }

  async updateNotificationSettings(userId: string, updateData: any) {
    const supabase = this.supabaseService.getClient();
    return await supabase
      .from('notification_settings')
      .update(updateData)
      .eq('user_id', userId);
  }

  async createNotificationSettings(userId: string, settingsData: any) {
    const supabase = this.supabaseService.getClient();
    return await supabase
      .from('notification_settings')
      .insert({ ...settingsData, user_id: userId });
  }

  async checkNotificationSettingsExists(userId: string) {
    const supabase = this.supabaseService.getClient();
    return await supabase
      .from('notification_settings')
      .select('user_id')
      .eq('user_id', userId)
      .single();
  }
}
