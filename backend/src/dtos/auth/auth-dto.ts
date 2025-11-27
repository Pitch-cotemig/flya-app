import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsDateString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class AuthDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsDateString()
  @IsNotEmpty()
  birthDate: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message:
      'A senha deve conter pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  confirmPassword: string;
}
