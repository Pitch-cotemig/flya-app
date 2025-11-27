import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../../config/supabase/supabase.service';

@Injectable()
export class ProfileRepository {
  constructor(private readonly supabaseService: SupabaseService) {}

  async getProfile(userId: string) {
    const supabase = this.supabaseService.getClient();
    return await supabase.from('profiles').select('*').eq('id', userId).single();
  }

  async updateProfile(userId: string, updateData: any) {
    const supabase = this.supabaseService.getClient();
    return await supabase
      .from('profiles')
      .update(updateData)
      .eq('id', userId);
  }

  async updateUserEmail(userId: string, email: string) {
    const supabase = this.supabaseService.getClient();
    return await supabase.auth.admin.updateUserById(userId, { email });
  }

  async uploadAvatar(fileName: string, fileBuffer: Buffer, contentType: string) {
    const supabase = this.supabaseService.getClient();
    return await supabase.storage
      .from('avatars')
      .upload(fileName, fileBuffer, { contentType, upsert: true });
  }

  async listAvatarFiles(folderPath: string) {
    const supabase = this.supabaseService.getClient();
    return await supabase.storage.from('avatars').list(folderPath);
  }

  async removeAvatarFiles(filePaths: string[]) {
    const supabase = this.supabaseService.getClient();
    return await supabase.storage.from('avatars').remove(filePaths);
  }

  async getAvatarPublicUrl(fileName: string) {
    const supabase = this.supabaseService.getClient();
    return supabase.storage.from('avatars').getPublicUrl(fileName);
  }

  async deleteProfile(userId: string) {
    const supabase = this.supabaseService.getClient();
    return await supabase.from('profiles').delete().eq('id', userId);
  }
}