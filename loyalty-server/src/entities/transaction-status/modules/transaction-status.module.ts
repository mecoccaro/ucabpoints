import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TransactionStatusController } from './transaction-status.controller';
import { TransactionStatusService } from './transaction-status.service';
import { TransactionStatus } from '../models/transaction-status.entity';
import { AppLoggerModule } from '../../../logger/app-logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionStatus]), AppLoggerModule],
  controllers: [TransactionStatusController],
  providers: [TransactionStatusService],
  exports: [TransactionStatusService],
})
export class TransactionStatusModule {}
