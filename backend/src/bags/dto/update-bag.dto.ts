import { CreateBagDto, BagItem } from './create-bag.dto';
import { IsArray, IsOptional } from 'class-validator';

export class UpdateBagDto {
  @IsArray()
  @IsOptional()
  items?: BagItem[];
}