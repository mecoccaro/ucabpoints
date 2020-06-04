import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommissionController } from './commission.controller';
import { CommissionService } from './commission.service';
import { Commission } from '../models/commission.entity';
import { AppLoggerModule } from '../../../logger/app-logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([Commission]), AppLoggerModule],
  controllers: [CommissionController],
  providers: [CommissionService],
  exports: [CommissionService],
})
export class CommissionModule {}
