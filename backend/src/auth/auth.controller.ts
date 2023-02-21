import { Controller, Post, UseGuards, Body, Request } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LocalGuard } from '../guards/local.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Controller()
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalGuard)
  @Post('signin')
  signin(@Request() req) {
    return this.authService.auth(req.user);
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds,
    );
    createUserDto.password = hashedPassword;

    const user = await this.usersService.create(createUserDto);

    const { password, ...responseUser } = user;

    return responseUser;
  }
}
