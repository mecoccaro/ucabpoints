import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BenefitController } from './benefit.controller';
import { BenefitService } from './benefit.service';
import { Benefit } from '../models/benefit.entity';
import { AppLoggerModule } from '../../../logger/app-logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([Benefit]), AppLoggerModule],
  controllers: [BenefitController],
  providers: [BenefitService],
})
export class BenefitModule {}
