import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './entities/wish.entity';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
  ) {}

  async create(createWishDto: CreateWishDto) {
    const wish = await this.wishRepository.create(createWishDto);

    const { owner, ...responseWish } = await this.wishRepository.save(wish);

    return responseWish;
  }
  findOne(query: FindManyOptions<Wish>) {
    return this.wishRepository.findOneOrFail(query);
  }

  findMany(query: FindManyOptions<Wish>) {
    return this.wishRepository.find(query);
  }

  async updateOne(query: FindManyOptions<Wish>, updateWishDto: UpdateWishDto) {
    const wish = await this.wishRepository.findOneOrFail(query);

    if (wish) {
      const wishForUpdate = { ...wish, ...updateWishDto };

      return this.wishRepository.save(wishForUpdate);
    }
  }

  async removeOne(query: FindManyOptions<Wish>) {
    const wish = await this.wishRepository.find(query);

    if (wish) {
      this.wishRepository.remove(wish);
      return wish;
    }
  }
}
