import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateWishlistDto {
  @IsString()
  @MinLength(1)
  @MaxLength(250)
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  image?: string;

  @IsArray()
  @IsOptional()
  itemsId?: number[];
}
