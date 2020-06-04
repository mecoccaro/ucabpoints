import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../modules/auth.service';

@Injectable()
export class FirebaseLocalStrategy extends PassportStrategy(
  Strategy,
  'firebaselogin'
) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'email',
    });
  }

  async validate(email: string): Promise<any> {
    const user = await this.authService.validateUser(email, null);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
