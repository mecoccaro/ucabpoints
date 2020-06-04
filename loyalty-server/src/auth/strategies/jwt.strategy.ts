import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { ConfigService } from '../../config/modules/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ({ signedCookies: { access_token } }) => access_token,
      ignoreExpiration: false,
      secretOrKey: configService.get('SECRET'),
    });
  }

  async validate({ sub: userId, username }: any) {
    return { userId, username };
  }
}
