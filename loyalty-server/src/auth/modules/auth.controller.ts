import {
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

import { AppLoggerService } from 'src/logger/app-logger.service';
import { ConfigService } from '../../config/modules/config.service';
import { LoyaltyUser } from '../../entities/loyalty-user/models/loyalty-user.entity';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  private readonly _tokenName: string;

  constructor(
    private readonly _authService: AuthService,
    private readonly _configService: ConfigService,
    private appLoggerService: AppLoggerService
  ) {
    this._tokenName = this._configService.get('TOKEN_NAME');
    this.appLoggerService.setContext('AuthController');
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(
    @Req() req: Request & { user: Partial<LoyaltyUser> },
    @Res() res: Response
  ) {
    this.appLoggerService.log('Login', 'AuthController');
    const result = await this._authService.login(req.user);

    res.cookie(this._tokenName, result.access_token, {
      path: '/',
      httpOnly: false,
      signed: true,
      secure: false,
      domain: 'localhost',
      maxAge: 7200000,
    });

    res.status(HttpStatus.OK).send({
      user: result.user,
      cookie: result.access_token,
    });
  }

  @UseGuards(AuthGuard('admin'))
  @Post('adminLogin')
  async adminLogin(
    @Req() req: Request & { user: Partial<LoyaltyUser> },
    @Res() res: Response
  ) {
    this.appLoggerService.log('adminLogin', 'AuthController');
    const result = await this._authService.adminLogin(req.user);

    res.cookie(this._tokenName, result.access_token, {
      path: '/',
      httpOnly: false,
      signed: true,
      secure: false,
      domain: 'localhost',
      maxAge: 7200000,
    });

    res.status(HttpStatus.OK).send({
      user: result.user,
      cookie: result.access_token,
    });
  }

  @UseGuards(AuthGuard('firebaselogin'))
  @Post('firebaselogin')
  async firebaseLogin(
    @Req() req: Request & { user: Partial<LoyaltyUser> },
    @Res() res: Response
  ) {
    this.appLoggerService.log('Firebase Login', 'AuthController');
    const result = await this._authService.login(req.user);

    res.cookie(this._tokenName, result.access_token, {
      path: '/',
      httpOnly: false,
      signed: true,
      secure: false,
      domain: 'localhost',
      maxAge: 7200000,
    });

    res.status(HttpStatus.OK).send({
      user: result.user,
      cookie: result.access_token,
    });
  }

  //@UseGuards(AuthGuard('jwt'))
  @Post('logout')
  async logout(@Res() res: Response) {
    res
      .status(HttpStatus.NO_CONTENT)
      .clearCookie(this._tokenName)
      .send();
  }
}
