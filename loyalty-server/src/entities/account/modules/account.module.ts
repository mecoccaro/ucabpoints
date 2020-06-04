import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { Account } from '../models/account.entity';
import { AppLoggerModule } from '../../../logger/app-logger.module';
import { StatusModule } from 'src/entities/status/modules/status.module';
import { AccountStatusModule } from 'src/entities/account-status/modules/account-status.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    AppLoggerModule,
    StatusModule,
    AccountStatusModule,
  ],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
