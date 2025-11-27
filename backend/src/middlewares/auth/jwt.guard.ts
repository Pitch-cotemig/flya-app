import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SupabaseService } from 'src/config/supabase/supabase.service';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly supabaseService: SupabaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    const supabase = this.supabaseService.getClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    request.user = user;
    return true;
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
