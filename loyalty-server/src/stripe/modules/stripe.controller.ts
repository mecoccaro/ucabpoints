import {
  Controller,
  Post,
  Body,
  Put,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import Stripe from 'stripe';

import { AppLoggerService } from 'src/logger/app-logger.service';
import { StripeService } from './stripe.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('stripe')
//@UseGuards(AuthGuard('jwt'))
export class StripeController {
  constructor(
    private stripeService: StripeService,
    private appLoggerService: AppLoggerService
  ) {
    this.appLoggerService.setContext('StripeController');
  }

  @Post('create-customer')
  createCustomer(
    @Body() user: Stripe.CustomerCreateParams
  ): Promise<Stripe.Customer> {
    this.appLoggerService.log(
      'Create a customer in Stripe',
      'StripeController'
    );
    return this.stripeService.createCustomer(user);
  }

  @Post('create-account')
  createAccount(
    @Body() user: Stripe.AccountCreateParams
  ): Promise<Stripe.Account> {
    this.appLoggerService.log(
      'Create an account in Stripe',
      'StripeController'
    );
    return this.stripeService.createAccount(user);
  }

  @Post('assign-bank-account')
  assignBankAccount(@Body() userBankAccount): Promise<any> {
    this.appLoggerService.log(
      'Assign a bank account in Stripe',
      'StripeController'
    );
    return this.stripeService.assignBankAccount(userBankAccount);
  }

  @Post('delete-bank-account')
  deleteBankAccount(@Body() userBankAccount): Promise<any> {
    this.appLoggerService.log(
      'Delete a bank account in Stripe',
      'StripeController'
    );
    return this.stripeService.deleteBankAccount(userBankAccount);
  }

  @Put('verify-bank-account')
  verifyBankAccount(@Body() userBankAccount): Promise<Stripe.BankAccount> {
    this.appLoggerService.log(
      'Verify a bank account in Stripe',
      'StripeController'
    );
    return this.stripeService.verifyBankAccount(userBankAccount);
  }

  @Post('charge')
  createCharge(@Body() charge): Promise<Stripe.Charge> {
    this.appLoggerService.log(
      'Create a charge intent in Stripe',
      'StripeController'
    );
    return this.stripeService.createCharge(charge);
  }

  @Post('transfer')
  createTransfer(@Body() transfer): Promise<Stripe.Transfer> {
    this.appLoggerService.log('Create a tranfer in Stripe', 'StripeController');
    return this.stripeService.createTransfer(transfer);
  }

  @Get('capture-charge/:charge')
  captureCharge(@Param('charge') charge): Promise<Stripe.Charge> {
    this.appLoggerService.log('Capture a charge in Stripe', 'StripeController');
    return this.stripeService.captureCharge(charge);
  }

  @Get('amounts')
  getAmmounts(): Object {
    this.appLoggerService.log('Create the random amounts', 'StripeController');
    return this.stripeService.getAmmounts();
  }

  @Get('routing-number/:number')
  validateRoutingNumber(@Param('number') routingNumber: string): boolean {
    this.appLoggerService.log(
      `Validate routing number ${routingNumber}`,
      'StripeController'
    );
    return this.stripeService.validateRoutingNumber(routingNumber);
  }
}
