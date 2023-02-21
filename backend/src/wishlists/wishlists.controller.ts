import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { WishesService } from 'src/wishes/wishes.service';
import { In } from 'typeorm';
import { JwtGuard } from 'src/guards/jwt.guard';

@Controller('wishlistlists')
export class WishlistsController {
  constructor(
    private readonly wishlistsService: WishlistsService,
    private readonly wishesService: WishesService,
  ) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(@Request() req, @Body() createWishlistDto: CreateWishlistDto) {
    const wishes = await this.wishesService.findMany({
      where: { id: In(createWishlistDto.itemsId || []) },
    });

    return this.wishlistsService.create(wishes, req.user, createWishlistDto);
  }

  @Get()
  findAll() {
    return this.wishlistsService.findMany({
      relations: { owner: true },
    });
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.wishlistsService.findOne({
      relations: { owner: true, items: true },
      where: { id: id },
    });
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  patch(@Param('id') id: number, @Body() updateWishListDto: UpdateWishlistDto) {
    return this.wishlistsService.updateOne(
      { where: { id: id } },
      updateWishListDto,
    );
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.wishlistsService.removeOne({ where: { id: id } });
  }
}
