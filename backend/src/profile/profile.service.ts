import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ProfileService {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly authService: AuthService
  ) {}

  async getProfile(token: string) {
    const userValidation = await this.authService.validateToken(token);
    
    if (!userValidation.user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const supabase = this.supabaseService.getClient();
    const userId = userValidation.user.id;

    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      return {
        success: true,
        message: 'Perfil carregado com sucesso',
        user: {
          id: profile.id,
          email: userValidation.user.email,
          username: profile.username,
          firstName: profile.first_name,
          lastName: profile.last_name,
          birthDate: profile.birth_date,
          avatar: profile.avatar_url,
          createdAt: profile.created_at,
          updatedAt: profile.updated_at
        }
      };
    } catch (error) {
      console.error('Erro detalhado ao buscar perfil:', error);
      throw new BadRequestException('Erro ao buscar perfil: ' + error.message);
    }
  }

  async updateProfile(token: string, profileData: any, file?: Express.Multer.File) {
    const userValidation = await this.authService.validateToken(token);
    
    if (!userValidation.user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const supabase = this.supabaseService.getClient();
    const userId = userValidation.user.id;

    try {
      let avatarUrl: string | null = null;

      if (file) {
        const folderPath = `users/${userId}`;
        const timestamp = Date.now();
        const fileName = `${folderPath}/avatar_${timestamp}.${file.originalname.split('.').pop()}`;
        


        const { data: existingFiles } = await supabase.storage
          .from('avatars')
          .list(folderPath);
        

        if (existingFiles && existingFiles.length > 0) {
          const filesToRemove = existingFiles.map(f => `${folderPath}/${f.name}`);

          const { error: removeError } = await supabase.storage
            .from('avatars')
            .remove(filesToRemove);
            
          if (removeError) {
            throw new Error('Erro ao remover avatar antigo: ' + removeError.message);
          }
        }
        
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(fileName, file.buffer, {
            contentType: file.mimetype,
            upsert: true
          });

        if (uploadError) {
          throw new Error('Erro no upload: ' + uploadError.message);
        }

        const { data: { publicUrl } } = supabase.storage
          .from('avatars')
          .getPublicUrl(fileName);
        
        avatarUrl = publicUrl;
      }


      if (profileData.email && profileData.email !== userValidation.user.email) {
        const { error: emailError } = await supabase.auth.admin.updateUserById(
          userId,
          { email: profileData.email }
        );
        
        if (emailError) {
          throw new Error('Erro ao atualizar email: ' + emailError.message);
        }
      }


      const updateData: any = {
        updated_at: new Date().toISOString()
      };

      if (profileData.username) updateData.username = profileData.username;
      if (profileData.firstName) updateData.first_name = profileData.firstName;
      if (profileData.lastName) updateData.last_name = profileData.lastName;
      

      if (profileData.firstName || profileData.lastName) {
        const firstName = profileData.firstName || userValidation.user.firstName || '';
        const lastName = profileData.lastName || userValidation.user.lastName || '';
        updateData.full_name = `${firstName} ${lastName}`.trim();
      }
      
      if (profileData.birthDate) updateData.birth_date = profileData.birthDate;
      if (profileData.email) updateData.email = profileData.email;
      if (avatarUrl) updateData.avatar_url = avatarUrl;

      const { error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', userId);

      if (error) {
        throw new Error('Erro ao atualizar perfil: ' + error.message);
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      return {
        success: true,
        message: 'Perfil atualizado com sucesso',
        user: {
          id: profile.id,
          email: profile.email,
          username: profile.username,
          firstName: profile.first_name,
          lastName: profile.last_name,
          birthDate: profile.birth_date,
          avatar: profile.avatar_url
        }
      };
    } catch (error) {
      console.error('Erro detalhado ao atualizar perfil:', error);
      throw new BadRequestException('Erro ao atualizar perfil: ' + error.message);
    }
  }




}