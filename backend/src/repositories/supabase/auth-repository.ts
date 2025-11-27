import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../config/supabase/supabase.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly supabaseService: SupabaseService) {}

  async createUser(email: string, password: string) {
    const supabase = this.supabaseService.getClient();
    return await supabase.auth.signUp({ email, password });
  }

  async signInUser(email: string, password: string) {
    const supabase = this.supabaseService.getClient();
    return await supabase.auth.signInWithPassword({ email, password });
  }

  async createProfile(profileData: any) {
    const supabase = this.supabaseService.getClient();
    return await supabase.from('profiles').insert(profileData);
  }

  async createSecuritySettings(userId: string) {
    const supabase = this.supabaseService.getClient();
    return await supabase.from('security_settings').insert({ user_id: userId });
  }

  async createNotificationSettings(userId: string) {
    const supabase = this.supabaseService.getClient();
    return await supabase.from('notification_settings').insert({ user_id: userId });
  }

  async getProfileById(userId: string) {
    const supabase = this.supabaseService.getClient();
    return await supabase.from('profiles').select('*').eq('id', userId).single();
  }

  async getProfileByEmail(email: string) {
    const supabase = this.supabaseService.getClient();
    return await supabase.from('profiles').select('*').eq('email', email).single();
  }

  async deleteUser(userId: string) {
    const supabase = this.supabaseService.getClient();
    return await supabase.auth.admin.deleteUser(userId);
  }

  async getUserByToken(token: string) {
    const { createClient } = require('@supabase/supabase-js');
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
    const supabaseAnon = createClient(supabaseUrl, supabaseAnonKey);
    return await supabaseAnon.auth.getUser(token);
  }

  async save2FACode(email: string, code: string, expiresAt: string) {
    const supabase = this.supabaseService.getClient();
    return await supabase.from('two_factor_codes').upsert({
      email,
      code,
      expires_at: expiresAt,
    });
  }

  async get2FACode(email: string, code: string) {
    const supabase = this.supabaseService.getClient();
    return await supabase
      .from('two_factor_codes')
      .select('*')
      .eq('email', email)
      .eq('code', code)
      .gt('expires_at', new Date().toISOString())
      .single();
  }

  async delete2FACode(email: string) {
    const supabase = this.supabaseService.getClient();
    return await supabase.from('two_factor_codes').delete().eq('email', email);
  }

  async update2FAStatus(userId: string, enabled: boolean) {
    const supabase = this.supabaseService.getClient();
    return await supabase
      .from('profiles')
      .update({ two_factor_enabled: enabled })
      .eq('id', userId);
  }

  async get2FAStatus(userId: string) {
    const supabase = this.supabaseService.getClient();
    return await supabase
      .from('profiles')
      .select('two_factor_enabled')
      .eq('id', userId)
      .single();
  }
}