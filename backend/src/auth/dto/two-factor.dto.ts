import { IsNotEmpty, IsString, Length } from 'class-validator';

export class Send2FADto {
  @IsNotEmpty()
  @IsString()
  email: string;
}

export class Verify2FADto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 6)
  code: string;
}
