import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { WishesModule } from './wishes/wishes.module';
import { WishlistsModule } from './wishlists/wishlists.module';
import { OffersModule } from './offers/offers.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { Wish } from './wishes/entities/wish.entity';
import { Offer } from './offers/entities/offer.entity';
import { Wishlist } from './wishlists/entities/wishlist.entity';
import { ConfigModule } from '@nestjs/config';
//import configuration from 'configuration';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'student',
      password: 'student',
      schema: 'nest_project',
      database: 'nest_project',
      entities: [User, Wish, Offer, Wishlist],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    WishesModule,
    WishlistsModule,
    OffersModule,
    // ConfigModule.forRoot({
    //   load: [configuration],
    // }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
