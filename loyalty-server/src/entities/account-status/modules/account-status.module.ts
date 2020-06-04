import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountStatusController } from './account-status.controller';
import { AccountStatusService } from './account-status.service';
import { AccountStatus } from '../models/account-status.entity';
import { AppLoggerModule } from '../../../logger/app-logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([AccountStatus]), AppLoggerModule],
  controllers: [AccountStatusController],
  providers: [AccountStatusService],
  exports: [AccountStatusService],
})
export class AccountStatusModule {}
