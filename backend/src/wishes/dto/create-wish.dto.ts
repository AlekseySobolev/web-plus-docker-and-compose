import {
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreateWishDto {
  @IsString()
  @MinLength(1)
  @MaxLength(250)
  name: string;

  @IsString()
  @IsUrl()
  link: string;

  @IsString()
  @IsUrl()
  image: string;

  @IsNumber()
  @IsPositive()
  price: number;

  owner: User;

  @IsString()
  @MinLength(1)
  @MaxLength(1024)
  description: string;
}
