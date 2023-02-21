import { Entity, Column, OneToMany } from 'typeorm';
import { CommonColumns } from 'src/commonColumns/commonColumns.entity';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Wish } from 'src/wishes/entities/wish.entity';
import { Offer } from 'src/offers/entities/offer.entity';
import { Wishlist } from 'src/wishlists/entities/wishlist.entity';

@Entity()
export class User extends CommonColumns {
  @Column({
    type: 'varchar',
    length: 30,
    unique: true,
    nullable: false,
  })
  @MinLength(2)
  @MaxLength(30)
  @IsNotEmpty()
  username: string;

  @Column({
    type: 'varchar',
    length: 200,
    default: 'Пока ничего не рассказал о себе',
  })
  @MinLength(2)
  @MaxLength(200)
  @IsOptional()
  about?: string;

  @Column({
    type: 'varchar',
    default: 'https://i.pravatar.cc/300',
  })
  @IsString()
  @IsUrl()
  @IsOptional()
  avatar?: string;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column({
    type: 'varchar',
    nullable: false,
    select: false,
  })
  @IsString()
  @MinLength(2)
  password: string;

  @OneToMany(() => Wish, (wish) => wish.owner)
  wishes: Wish[];

  @OneToMany(() => Offer, (offer) => offer.user)
  offers: Offer[];

  @OneToMany(() => Wishlist, (wishlist) => wishlist.owner)
  wishlists: Wishlist[];
}
