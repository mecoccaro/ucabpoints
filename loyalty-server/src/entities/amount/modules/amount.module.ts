import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AmountController } from './amount.controller';
import { AmountService } from './amount.service';
import { Amount } from '../models/amount.entity';
import { AppLoggerModule } from '../../../logger/app-logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([Amount]), AppLoggerModule],
  controllers: [AmountController],
  providers: [AmountService],
})
export class AmountModule {}
