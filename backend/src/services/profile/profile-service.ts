import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { ProfileRepository } from '../../repositories/supabase/profile/profile-repository';
import { AuthService } from '../../services/auth-service';

@Injectable()
export class ProfileService {
  constructor(
    private readonly profileRepository: ProfileRepository,
    private readonly authService: AuthService,
  ) {}

  async getProfile(token: string) {
    const userValidation = await this.authService.validateToken(token);

    if (!userValidation.user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const userId = userValidation.user.id;

    try {
      const { data: profile } = await this.profileRepository.getProfile(userId);

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
          updatedAt: profile.updated_at,
        },
      };
    } catch (error) {
      console.error('Erro detalhado ao buscar perfil:', error);
      throw new BadRequestException('Erro ao buscar perfil: ' + error.message);
    }
  }

  async updateProfile(
    token: string,
    profileData: any,
    file?: Express.Multer.File,
  ) {
    const userValidation = await this.authService.validateToken(token);

    if (!userValidation.user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const userId = userValidation.user.id;

    try {
      let avatarUrl: string | null = null;

      if (file) {
        const folderPath = `users/${userId}`;
        const timestamp = Date.now();
        const fileName = `${folderPath}/avatar_${timestamp}.${file.originalname.split('.').pop()}`;

        const { data: existingFiles } = await this.profileRepository.listAvatarFiles(folderPath);

        if (existingFiles && existingFiles.length > 0) {
          const filesToRemove = existingFiles.map(
            (f) => `${folderPath}/${f.name}`,
          );

          const { error: removeError } = await this.profileRepository.removeAvatarFiles(filesToRemove);

          if (removeError) {
            throw new Error(
              'Erro ao remover avatar antigo: ' + removeError.message,
            );
          }
        }

        const { error: uploadError } = await this.profileRepository.uploadAvatar(
          fileName,
          file.buffer,
          file.mimetype
        );

        if (uploadError) {
          throw new Error('Erro no upload: ' + uploadError.message);
        }

        const {
          data: { publicUrl },
        } = await this.profileRepository.getAvatarPublicUrl(fileName);

        avatarUrl = publicUrl;
      }

      if (
        profileData.email &&
        profileData.email !== userValidation.user.email
      ) {
        const { error: emailError } = await this.profileRepository.updateUserEmail(
          userId,
          profileData.email
        );

        if (emailError) {
          throw new BadRequestException('Este email já está sendo usado');
        }
      }

      const updateData: any = {
        updated_at: new Date().toISOString(),
      };

      if (profileData.username) updateData.username = profileData.username;
      if (profileData.firstName) updateData.first_name = profileData.firstName;
      if (profileData.lastName) updateData.last_name = profileData.lastName;

      if (profileData.firstName || profileData.lastName) {
        const firstName =
          profileData.firstName || userValidation.user.firstName || '';
        const lastName =
          profileData.lastName || userValidation.user.lastName || '';
        updateData.full_name = `${firstName} ${lastName}`.trim();
      }

      if (profileData.birthDate) updateData.birth_date = profileData.birthDate;
      if (profileData.email) updateData.email = profileData.email;
      if (avatarUrl) updateData.avatar_url = avatarUrl;

      const { error } = await this.profileRepository.updateProfile(userId, updateData);

      if (error) {
        if (error.code === '23505' && error.message.includes('email')) {
          throw new BadRequestException('Este email já está sendo usado');
        }
        if (error.code === '23505' && error.message.includes('username')) {
          throw new BadRequestException(
            'Este nome de usuário já está sendo usado',
          );
        }
        throw new BadRequestException(
          'Erro ao atualizar perfil: ' + error.message,
        );
      }

      const { data: profile } = await this.profileRepository.getProfile(userId);

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
          avatar: profile.avatar_url,
        },
      };
    } catch (error) {
      console.error('Erro detalhado ao atualizar perfil:', error);

      if (error instanceof BadRequestException) {
        throw error;
      }

      if (
        error.message?.includes('already registered') ||
        error.message?.includes('email_address_not_authorized')
      ) {
        throw new BadRequestException('Este email já está sendo usado');
      }

      throw new BadRequestException(
        'Erro ao atualizar perfil: ' + error.message,
      );
    }
  }
}
