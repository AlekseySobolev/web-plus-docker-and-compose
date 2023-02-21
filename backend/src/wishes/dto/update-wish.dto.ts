import { PartialType } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CreateWishDto } from './create-wish.dto';

export class UpdateWishDto extends PartialType(CreateWishDto) {
  @IsString()
  @MinLength(1)
  @MaxLength(250)
  @IsOptional()
  name?: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  link?: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  image?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @IsString()
  @MinLength(1)
  @MaxLength(1024)
  @IsOptional()
  description?: string;
}
