import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private wishListsRepository: Repository<Wishlist>,
  ) {}

  async create(
    wishes: Wish[],
    user: User,
    createWishlistDto: CreateWishlistDto,
  ) {
    const wishList = await this.wishListsRepository.create(createWishlistDto);

    wishList.owner = user;
    wishList.items = wishes;

    const savedWishList = await this.wishListsRepository.save(wishList);

    const { owner, items, ...responseWishList } = savedWishList;

    return responseWishList;
  }

  findMany(query: FindManyOptions<Wishlist>) {
    return this.wishListsRepository.find(query);
  }

  findOne(query: FindManyOptions<Wishlist>) {
    return this.wishListsRepository.findOneOrFail(query);
  }

  async updateOne(
    query: FindManyOptions<Wishlist>,
    updateWishlistDto: UpdateWishlistDto,
  ) {
    const wishList = await this.wishListsRepository.findOneOrFail(query);

    if (wishList) {
      const wishListForUpdate = { ...wishList, ...updateWishlistDto };

      return this.wishListsRepository.save(wishListForUpdate);
    }
  }

  async removeOne(query: FindManyOptions<Wishlist>) {
    const wishList = await this.wishListsRepository.find(query);

    if (wishList) {
      this.wishListsRepository.remove(wishList);
      return wishList;
    }
  }
}
