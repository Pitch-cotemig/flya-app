import { BagItem } from './create-bag.dto';
import { IsArray } from 'class-validator';

export class UpdateBagDto {
  @IsArray()
  items: BagItem[];
}