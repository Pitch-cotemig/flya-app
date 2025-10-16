import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService implements OnModuleInit {
  private supabase: SupabaseClient;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseServiceKey = this.configService.get<string>('SUPABASE_SERVICE_KEY');

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('SUPABASE_URL and SUPABASE_SERVICE_KEY must be defined.');
    }

    this.supabase = createClient(supabaseUrl, supabaseServiceKey);
  }

  getClient() {
    return this.supabase;
  }
}
