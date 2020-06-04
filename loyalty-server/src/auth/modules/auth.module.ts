import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AppLoggerModule } from '../../logger/app-logger.module';
import { ConfigModule } from '../../config/modules/config.module';
import configService, {
  ConfigService,
} from '../../config/modules/config.service';

import { JwtStrategy } from '../strategies/jwt.strategy';
import { LocalStrategy } from '../strategies/local.strategy';

import { LoyaltyUserModule } from '../../entities/loyalty-user/modules/loyalty-user.module';
import { UserStatusModule } from '../../entities/user-status/modules/user-status.module';
import { StatusModule } from '../../entities/status/modules/status.module';
import { PersonModule } from 'src/entities/person/modules/person.module';
import { RoleModule } from 'src/entities/role/modules/role.module';
import { AuthController } from './auth.controller';
import { FirebaseLocalStrategy } from '../strategies/firebase-local.strategy';
import { AdminStrategy } from '../strategies/admin.strategy';

@Module({
  imports: [
    LoyaltyUserModule,
    UserStatusModule,
    StatusModule,
    PersonModule,
    RoleModule,
    PassportModule,
    JwtModule.register({
      secret: configService.get('SECRET'),
      signOptions: { expiresIn: '12h' }, // tiempo de expiración del token
    }),
    AppLoggerModule,
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    FirebaseLocalStrategy,
    JwtStrategy,
    AdminStrategy,
    {
      provide: ConfigService,
      useValue: configService,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
