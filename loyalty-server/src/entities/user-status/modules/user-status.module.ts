import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserStatus } from '../models/user-status.entity';
import { UserStatusController } from './user-status.controller';
import { UserStatusService } from './user-status.service';
import { AppLoggerModule } from '../../../logger/app-logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserStatus]), AppLoggerModule],
  controllers: [UserStatusController],
  providers: [UserStatusService],
  exports: [UserStatusService],
})
export class UserStatusModule {}
