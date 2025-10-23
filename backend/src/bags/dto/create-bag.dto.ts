import { IsString, IsArray, IsOptional } from 'class-validator';

export class CreateBagDto {
  @IsString()
  tripId: string;

  @IsString()
  userId: string;

  @IsArray()
  @IsOptional()
  items?: BagItem[];
}

export interface BagItem {
  id?: string;
  name: string;
  category: string;
  quantity: number;
  packed: boolean;
}