import {
  IsArray,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreatePlanningDto {
  @IsString()
  @IsNotEmpty()
  motivo: string;

  @IsString()
  @IsNotEmpty()
  destino: string;

  @IsString()
  @IsOptional()
  destinoEspecifico?: string;

  @IsString()
  @IsNotEmpty()
  pet: string;

  @IsDateString()
  @IsNotEmpty()
  dataInicio: string;

  @IsDateString()
  @IsNotEmpty()
  dataFim: string;

  @IsString()
  @IsNotEmpty()
  orcamento: string;

  @IsString()
  @IsNotEmpty()
  acompanhantes: string;

  @IsString()
  @IsNotEmpty()
  transporte: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  clima: string[];
}
