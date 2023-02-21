import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateOfferDto } from './dto/create-offer.dto';
import { Offer } from './entities/offer.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
  ) {}

  async create(user: User, wish: Wish, createOfferDto: CreateOfferDto) {
    const offer = await this.offerRepository.create(createOfferDto);

    offer.user = user;
    offer.item = wish;

    return this.offerRepository.save(offer);
  }

  findAll() {
    return this.offerRepository.find();
  }

  findOne(query: FindManyOptions<Offer>) {
    return this.offerRepository.findOneOrFail(query);
  }
}
