import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BenefitPlanController } from './benefit-plan.controller';
import { BenefitPlanService } from './benefit-plan.service';
import { BenefitPlan } from '../models/benefit-plan.entity';
import { AppLoggerModule } from '../../../logger/app-logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([BenefitPlan]), AppLoggerModule],
  controllers: [BenefitPlanController],
  providers: [BenefitPlanService],
})
export class BenefitPlanModule {}
