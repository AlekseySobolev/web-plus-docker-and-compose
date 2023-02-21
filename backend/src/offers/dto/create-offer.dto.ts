import { IsBoolean, IsInt } from 'class-validator';

export class CreateOfferDto {
  @IsInt()
  amount: number;

  @IsBoolean()
  hidden: boolean;

  @IsInt()
  itemId: number;
}
