import { forwardRef, Module } from '@nestjs/common';
import { WishesService } from './wishes.service';
import { WishesController } from './wishes.controller';
import { Wish } from './entities/wish.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [forwardRef(() => UsersModule), TypeOrmModule.forFeature([Wish])],
  controllers: [WishesController],
  providers: [WishesService],
  exports: [WishesService],
})
export class WishesModule {}
