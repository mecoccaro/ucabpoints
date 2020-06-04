import { Module, forwardRef } from '@nestjs/common';
import { AppLoggerModule } from 'src/logger/app-logger.module';
import { TasksService } from './tasks.service';
import { StripeModule } from 'src/stripe/modules/stripe.module';
import { TasksController } from './tasks.controller';
import { TransactionModule } from 'src/entities/transaction/modules/transaction.module';
import { StatusModule } from 'src/entities/status/modules/status.module';
import { TransactionStatusModule } from 'src/entities/transaction-status/modules/transaction-status.module';

@Module({
  imports: [
    AppLoggerModule,
    StripeModule,
    TransactionModule,
    StatusModule,
    TransactionStatusModule,
  ],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}
