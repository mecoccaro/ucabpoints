import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { Transaction } from '../models/transaction.entity';
import { AppLoggerModule } from '../../../logger/app-logger.module';
import { AccountModule } from 'src/entities/account/modules/account.module';
import { TransactionStatusModule } from 'src/entities/transaction-status/modules/transaction-status.module';
import { StatusModule } from 'src/entities/status/modules/status.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction]),
    AppLoggerModule,
    AccountModule,
    TransactionStatusModule,
    StatusModule,
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}
