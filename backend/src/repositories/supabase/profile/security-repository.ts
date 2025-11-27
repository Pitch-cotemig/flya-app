import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../../config/supabase/supabase.service';

@Injectable()
export class SecurityRepository {
  constructor(private readonly supabaseService: SupabaseService) {}

  async updateUserPassword(userId: string, newPassword: string) {
    const supabase = this.supabaseService.getClient();
    return await supabase.auth.admin.updateUserById(userId, { password: newPassword });
  }

  async getSecuritySettings(userId: string) {
    const supabase = this.supabaseService.getClient();
    return await supabase
      .from('security_settings')
      .select('*')
      .eq('user_id', userId)
      .single();
  }

  async createSecuritySettings(userId: string) {
    const supabase = this.supabaseService.getClient();
    return await supabase
      .from('security_settings')
      .insert({ user_id: userId })
      .select()
      .single();
  }

  async updateSecuritySettings(userId: string, updateData: any) {
    const supabase = this.supabaseService.getClient();
    return await supabase
      .from('security_settings')
      .update(updateData)
      .eq('user_id', userId);
  }

  async createSecuritySettingsWithData(userId: string, settingsData: any) {
    const supabase = this.supabaseService.getClient();
    return await supabase
      .from('security_settings')
      .insert({ user_id: userId, ...settingsData });
  }

  async checkSecuritySettingsExists(userId: string) {
    const supabase = this.supabaseService.getClient();
    return await supabase
      .from('security_settings')
      .select('user_id')
      .eq('user_id', userId)
      .single();
  }

  async delete2FACodesByEmail(email: string) {
    const supabase = this.supabaseService.getClient();
    return await supabase
      .from('two_factor_codes')
      .delete()
      .eq('email', email);
  }
}