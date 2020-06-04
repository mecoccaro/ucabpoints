import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoyaltyUserController } from './loyalty-user.controller';
import { LoyaltyUserService } from './loyalty-user.service';
import { LoyaltyUser } from '../models/loyalty-user.entity';
import { AppLoggerModule } from '../../../logger/app-logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([LoyaltyUser]), AppLoggerModule],
  controllers: [LoyaltyUserController],
  providers: [LoyaltyUserService],
  exports: [LoyaltyUserService],
})
export class LoyaltyUserModule {}
