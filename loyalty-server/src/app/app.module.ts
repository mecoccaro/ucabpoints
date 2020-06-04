import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '../config/modules/config.module';
import configService from '../config/modules/config.service';

import { AuthModule } from '../auth/modules/auth.module';
import { StripeModule } from 'src/stripe/modules/stripe.module';
import { TasksModule } from 'src/tasks/modules/tasks.module';

import { PrivilegeModule } from '../entities/privilege/modules/privilege.module';
import { PersonModule } from '../entities/person/modules/person.module';
import { RoleModule } from '../entities/role/modules/role.module';
import { LoyaltyUserModule } from '../entities/loyalty-user/modules/loyalty-user.module';
import { PlanModule } from '../entities/plan/modules/plan.module';
import { BenefitModule } from '../entities/benefit/modules/benefit.module';
import { AccountModule } from '../entities/account/modules/account.module';
import { TransactionModule } from '../entities/transaction/modules/transaction.module';
import { AmountModule } from '../entities/amount/modules/amount.module';
import { StatusModule } from '../entities/status/modules/status.module';
import { RolePrivilegeModule } from '../entities/role-privilege/modules/role-privilege.module';
import { UserPlanModule } from '../entities/user-plan/modules/user-plan.module';
import { BenefitPlanModule } from '../entities/benefit-plan/modules/benefit-plan.module';
import { AccountStatusModule } from '../entities/account-status/modules/account-status.module';
import { TransactionStatusModule } from '../entities/transaction-status/modules/transaction-status.module';
import { ConversionModule } from '../entities/conversion/modules/conversion.module';
import { CommissionModule } from '../entities/commission/modules/commission.module';
import { PlaceModule } from '../entities/place/modules/place.module';
import { UserStatusModule } from '../entities/user-status/modules/user-status.module';
import { EmailModule } from '../email/modules/email.module';
import { AdminModule } from '../backoffice/modules/admin.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: configService.get<'postgres'>('TYPEORM_CONNECTION'),
      host: configService.get('TYPEORM_HOST'),
      port: parseInt(configService.get('TYPEORM_PORT'), 10),
      username: configService.get('TYPEORM_USERNAME'),
      password: configService.get('TYPEORM_PASSWORD'),
      database: configService.get('TYPEORM_DATABASE'),
      synchronize: configService.get('TYPEORM_SYNCHRONIZE') === 'true',
      entities: [__dirname + configService.get('TYPEORM_ENTITIES')],
    }),
    ScheduleModule.forRoot(),
    PrivilegeModule,
    PersonModule,
    RoleModule,
    LoyaltyUserModule,
    PlanModule,
    BenefitModule,
    AccountModule,
    TransactionModule,
    AmountModule,
    ConfigModule,
    StatusModule,
    RolePrivilegeModule,
    UserPlanModule,
    BenefitPlanModule,
    AccountStatusModule,
    TransactionStatusModule,
    ConversionModule,
    CommissionModule,
    PlaceModule,
    AuthModule,
    UserStatusModule,
    StripeModule,
    TasksModule,
    EmailModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
