import { Module } from '@nestjs/common';
import { AppLoggerModule } from '../../logger/app-logger.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from '../../entities/person/models/person.entity';
import { Account } from '../../entities/account/models/account.entity';
import { Transaction } from '../../entities/transaction/models/transaction.entity';
import { TransactionStatus } from '../../entities/transaction-status/models/transaction-status.entity';
import { Status } from '../../entities/status/models/status.entity';
import { PersonModule } from '../../entities/person/modules/person.module';
import { AccountModule } from '../../entities/account/modules/account.module';
import { TransactionModule } from '../../entities/transaction/modules/transaction.module';
import { TransactionStatusModule } from '../../entities/transaction-status/modules/transaction-status.module';
import { StatusModule } from '../../entities/status/modules/status.module';

import { PersonService } from '../../entities/person/modules/person.service';
import { AccountService } from '../../entities/account/modules/account.service';
import { TransactionService } from '../../entities/transaction/modules/transaction.service';
import { TransactionStatusService } from '../../entities/transaction-status/modules/transaction-status.service';
import { StatusService } from '../../entities/status/modules/status.service';
import { AccountStatusModule } from 'src/entities/account-status/modules/account-status.module';
import { AccountStatusService } from 'src/entities/account-status/modules/account-status.service';
import { AccountStatus } from 'src/entities/account-status/models/account-status.entity';

@Module({
  imports: [
    AppLoggerModule,
    TypeOrmModule.forFeature([Person]),
    TypeOrmModule.forFeature([Account]),
    TypeOrmModule.forFeature([AccountStatus]),
    TypeOrmModule.forFeature([Transaction]),
    TypeOrmModule.forFeature([TransactionStatus]),
    TypeOrmModule.forFeature([Status]),
    PersonModule,
    AccountModule,
    AccountStatusModule,
    TransactionModule,
    TransactionStatusModule,
    StatusModule,
  ],

  controllers: [AdminController],
  providers: [
    AdminService,
    PersonService,
    AccountService,
    AccountStatusService,
    TransactionService,
    TransactionStatusService,
    StatusService,
  ],
})
export class AdminModule {}
