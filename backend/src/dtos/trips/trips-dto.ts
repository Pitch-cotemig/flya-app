import {
  IsJSON,
  IsNotEmpty,
  IsString,
  IsObject,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateTripDto {
  @IsObject()
  @IsNotEmpty()
  prompt_data: object;

  @IsString()
  @IsNotEmpty()
  ai_prompt: string;

  @IsString()
  @IsNotEmpty()
  plan_result: string;

  @IsOptional()
  @IsBoolean()
  is_favorite?: boolean;
}

export class UpdateTripDto {
  @IsOptional()
  @IsBoolean()
  is_favorite?: boolean;
}
