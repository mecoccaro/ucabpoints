import { Injectable } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

import { AppLoggerService } from 'src/logger/app-logger.service';
import { StripeService } from 'src/stripe/modules/stripe.service';
import { TransactionService } from 'src/entities/transaction/modules/transaction.service';
import { StatusService } from 'src/entities/status/modules/status.service';
import { TransactionStatusService } from 'src/entities/transaction-status/modules/transaction-status.service';
import { Transaction } from 'src/entities/transaction/models/transaction.entity';

@Injectable()
export class TasksService {
  constructor(
    private schedulerRegistry: SchedulerRegistry,
    private appLoggerService: AppLoggerService,
    private stripeService: StripeService,
    private transactionService: TransactionService,
    private statusService: StatusService,
    private transactionStatusService: TransactionStatusService
  ) {
    this.appLoggerService.setContext('TasksService');
  }

  //@Cron('0 */5 * * * *')
  //async handleCron() {
  //  this.appLoggerService.debug(`Checking`, 'TasksService');
  //
  //  const status = await this.statusService.findOneByNameType(
  //    'SUCCEEDED',
  //    'TRANSACTION'
  //  );
  //
  //  const transactions = await this.transactionService.findAllByStatus(
  //    'SUCCEEDED'
  //  );
  //  let transaction: Transaction;
  //
  //  for (let i = 0; i < transactions.length; i++) {
  //    transaction = transactions[i];
  //    const charge = await this.stripeService.captureCharge(
  //      transaction.transactionStripe
  //    );
  //
  //    if (charge.status === 'succeeded') {
  //      this.appLoggerService.debug(
  //        `The charge ${transaction.transactionStripe} succeeded`,
  //        'TasksService'
  //      );
  //
  //      await this.transactionStatusService.create({
  //        dateCreation: new Date(),
  //        transaction: transaction.id,
  //        status: status.id,
  //      });
  //    }
  //  }
  //}

  addCronJob(name: string, chargeId: string) {
    const job = new CronJob(`0 */5 * * * *`, async () => {
      this.appLoggerService.debug(
        `Checking the charge ${chargeId}`,
        'TasksService'
      );

      const charge = await this.stripeService.captureCharge(chargeId);

      if (charge.status === 'succeeded') {
        this.appLoggerService.debug(
          `The charge ${chargeId} succeeded`,
          'TasksService'
        );
        const transaction = await this.transactionService.findTransactionsByTransactionStripe(
          chargeId
        );
        const status = await this.statusService.findOneByNameType(
          'SUCCEEDED',
          'TRANSACTION'
        );
        await this.transactionStatusService.create({
          dateCreation: new Date(),
          transaction: transaction.id,
          status: status.id,
        });
        await this.transactionService.update(transaction.id, {
          dateApprove: new Date(),
          lastDateUpdate: new Date(),
        });
        this.deleteCron(name);
      }
    });

    this.schedulerRegistry.addCronJob(name, job);
    job.start();

    this.appLoggerService.debug(
      `Job ${name} alled every 5 minutes to check the charge ${chargeId}`,
      'TasksService'
    );
  }

  deleteCron(name: string) {
    this.schedulerRegistry.deleteCronJob(name);
    this.appLoggerService.warn(`job ${name} deleted!`, 'TasksService');
  }
}
