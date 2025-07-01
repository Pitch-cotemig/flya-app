import { IsEmail, IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  nome: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
