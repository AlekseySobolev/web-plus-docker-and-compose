import { PartialType } from '@nestjs/swagger';
import {
  IsArray,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CreateWishlistDto } from './create-wishlist.dto';

export class UpdateWishlistDto extends PartialType(CreateWishlistDto) {
  @IsString()
  @MinLength(1)
  @MaxLength(250)
  @IsOptional()
  name?: string;

  @IsString()
  @MinLength(0)
  @MaxLength(1500)
  @IsOptional()
  description?: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  image?: string;

  @IsArray()
  @IsOptional()
  itemsId?: number[];
}
