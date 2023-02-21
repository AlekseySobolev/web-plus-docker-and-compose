import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(2)
  @MaxLength(200)
  @IsOptional()
  about?: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  avatar?: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  password: string;
}
