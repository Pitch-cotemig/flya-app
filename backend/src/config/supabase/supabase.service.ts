import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService implements OnModuleInit {
  private supabase: SupabaseClient;
  private supabaseUrl: string;
  private supabaseKey: string;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    this.supabaseUrl = this.configService.get<string>('SUPABASE_URL')!;
    this.supabaseKey = this.configService.get<string>('SUPABASE_SERVICE_KEY')!;

    if (!this.supabaseUrl || !this.supabaseKey) {
      throw new Error('SUPABASE_URL and SUPABASE_SERVICE_KEY must be defined.');
    }

    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
  }

  getClient() {
    return this.supabase;
  }

  getClientWithAuth(accessToken: string) {
    const client = createClient(this.supabaseUrl, this.supabaseKey);
    client.auth.setSession({
      access_token: accessToken,
      refresh_token: '',
    });
    return client;
  }
}
