import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'jwt_secret',//configService.get<string>('jwt_secret'),
    });
  }

  async validate(jwtPayload: { sub: number }) {
    1;
    const user = this.usersService.findOne({ where: { id: jwtPayload.sub } });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
