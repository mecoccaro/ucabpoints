import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PlanController } from './plan.controller';
import { PlanService } from './plan.service';
import { Plan } from '../models/plan.entity';
import { AppLoggerModule } from '../../../logger/app-logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([Plan]), AppLoggerModule],
  controllers: [PlanController],
  providers: [PlanService],
})
export class PlanModule {}
