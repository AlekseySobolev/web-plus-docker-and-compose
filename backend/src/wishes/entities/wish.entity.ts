import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { CommonColumns } from 'src/commonColumns/commonColumns.entity';
import {
  IsInt,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Offer } from 'src/offers/entities/offer.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Wish extends CommonColumns {
  @Column({
    type: 'varchar',
    length: 250,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(250)
  name: string;

  @Column({
    type: 'varchar',
  })
  @IsString()
  @IsUrl()
  link: string;

  @Column({
    type: 'varchar',
  })
  @IsString()
  @IsUrl()
  image: string;

  @Column({
    type: 'numeric',
    scale: 2,
  })
  @IsNumber()
  @IsPositive()
  price: number;

  @Column({
    type: 'numeric',
    scale: 2,
    default: 0,
  })
  @IsNumber()
  raised: number;

  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;

  @Column({
    type: 'varchar',
    length: 1024,
  })
  @MinLength(1)
  @MaxLength(1024)
  description: string;

  @OneToMany(() => Offer, (offer) => offer.item)
  offers: Offer[];

  @Column({
    type: 'integer',
    scale: 2,
    default: 0,
  })
  @IsInt()
  copied: number;
}
