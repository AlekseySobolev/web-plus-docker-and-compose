import { Entity, Column, ManyToOne } from 'typeorm';
import { CommonColumns } from 'src/commonColumns/commonColumns.entity';
import { IsBoolean, IsInt, IsPositive } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';

@Entity()
export class Offer extends CommonColumns {
  @ManyToOne(() => User, (user) => user.offers)
  user: User;

  @ManyToOne(() => Wish, (wish) => wish.offers)
  item: Wish;

  @Column({
    type: 'integer',
    scale: 2,
  })
  @IsInt()
  @IsPositive()
  amount: number;

  @Column({
    type: 'boolean',
    default: false,
  })
  @IsBoolean()
  hidden: boolean;
}
