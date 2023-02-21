import { Entity, Column, ManyToMany, ManyToOne, JoinTable } from 'typeorm';
import { CommonColumns } from 'src/commonColumns/commonColumns.entity';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';

@Entity()
export class Wishlist extends CommonColumns {
  @Column({
    type: 'varchar',
    length: 250,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(250)
  @IsNotEmpty()
  name: string;

  @Column({
    type: 'varchar',
    length: 1500,
    nullable: true,
  })
  @IsString()
  @MinLength(0)
  @MaxLength(1500)
  description: string;

  @Column({
    type: 'varchar',
  })
  @IsString()
  @IsUrl()
  @IsOptional()
  image?: string;

  @ManyToMany(() => Wish)
  @JoinTable()
  items: Wish[];

  @ManyToOne(() => User, (user) => user.wishlists)
  owner: User;
}
