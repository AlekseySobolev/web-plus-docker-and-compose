import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Request,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UsersService } from 'src/users/users.service';
import { WishesService } from 'src/wishes/wishes.service';
import { JwtGuard } from 'src/guards/jwt.guard';

@Controller('offers')
export class OffersController {
  constructor(
    private readonly offersService: OffersService,
    private readonly userssService: UsersService,
    private readonly wishessService: WishesService,
  ) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(@Request() req, @Body() createOfferDto: CreateOfferDto) {
    const user = await this.userssService.findOne({
      where: { id: req.user.id },
    });

    if (!user) {
      throw new NotFoundException();
    }

    const wish = await this.wishessService.findOne({
      where: { id: createOfferDto.itemId },
    });

    if (!wish) {
      throw new NotFoundException();
    }

    return this.offersService.create(user, wish, createOfferDto);
  }

  @Get()
  findAll() {
    return this.offersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.offersService.findOne({
      where: { id: id },
      relations: {
        user: true,
        item: true,
      },
    });
  }
}
