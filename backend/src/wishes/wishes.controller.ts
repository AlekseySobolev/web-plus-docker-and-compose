import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UsersService } from 'src/users/users.service';
import { JwtGuard } from 'src/guards/jwt.guard';
import { UpdateWishDto } from './dto/update-wish.dto';

@Controller('wishes')
export class WishesController {
  constructor(
    private readonly wishesService: WishesService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(@Request() req, @Body() createWishDto: CreateWishDto) {
    const user = await this.usersService.findOne({
      where: { id: req.user.id },
    });

    if (!user) {
      throw new NotFoundException();
    }

    createWishDto.owner = user;
    return this.wishesService.create(createWishDto);
  }

  @Get('last')
  last() {
    return this.wishesService.findMany({
      order: { createdAt: 'DESC' },
      take: 40,
    });
  }

  @Get('top')
  top() {
    return this.wishesService.findMany({
      order: { copied: 'DESC' },
      take: 10,
    });
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  find(@Param('id') id: number) {
    return this.wishesService.findOne({
      relations: {
        owner: true,
        offers: true,
      },
      where: {
        id: id,
      },
    });
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  patch(@Param('id') id: number, @Body() updateWishDto: UpdateWishDto) {
    return this.wishesService.updateOne({ where: { id: id } }, updateWishDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.wishesService.removeOne({ where: { id: id } });
  }

  @UseGuards(JwtGuard)
  @Post(':id/copy')
  async copy(@Request() req, @Param('id') id: number) {
    const wish = await this.wishesService.findOne({
      where: { id: id },
      relations: { owner: true },
    });

    if (wish && wish.owner !== req.user) {
      const copiedWish = { ...wish };
      copiedWish.owner = req.user;

      wish.copied += 1;
      this.wishesService.updateOne({ where: { id: id } }, wish);

      return this.wishesService.create(copiedWish);
    }
  }
}
