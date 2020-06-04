import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserPlanController } from './user-plan.controller';
import { UserPlanService } from './user-plan.service';
import { UserPlan } from '../models/user-plan.entity';
import { AppLoggerModule } from '../../../logger/app-logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserPlan]), AppLoggerModule],
  controllers: [UserPlanController],
  providers: [UserPlanService],
})
export class UserPlanModule {}
