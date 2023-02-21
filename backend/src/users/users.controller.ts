import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from 'src/guards/jwt.guard';
import { FindUserDto } from './dto/find-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtGuard)
  @Get('me')
  findMe(@Request() req) {
    return this.usersService.findOne({ where: { id: req.user.id } });
  }

  @UseGuards(JwtGuard)
  @Patch('me')
  updateMe(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateOne(
      { where: { id: req.user.id } },
      updateUserDto,
    );
  }

  @UseGuards(JwtGuard)
  @Get('me/wishes')
  async findMeWishes(@Request() req) {
    const user = await this.usersService.findOne({
      where: { id: req.user.id },
      relations: ['wishes'],
    });
    return user?.wishes || [];
  }

  @UseGuards(JwtGuard)
  @Get(':username')
  async findUserByUsername(@Param('username') username: string) {
    return this.usersService.findOne({ where: { username: username } });
  }

  @UseGuards(JwtGuard)
  @Get(':username/wishes')
  async findUserWishes(@Param('username') username: string) {
    const user = await this.usersService.findOne({
      where: { username: username },
      relations: ['wishes'],
    });
    return user?.wishes || [];
  }

  @UseGuards(JwtGuard)
  @Post('find')
  find(@Body() findUserDto: FindUserDto) {
    return this.usersService.findMany({
      where: [{ username: findUserDto.query }, { email: findUserDto.query }],
    });
  }
}
