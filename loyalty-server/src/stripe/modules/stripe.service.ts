import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

import { AppLoggerService } from 'src/logger/app-logger.service';
import { StripeConst } from '../models/stripe.const';
import { CommissionService } from 'src/entities/commission/modules/commission.service';

@Injectable()
export class StripeService {
  constructor(
    private stripe: Stripe,
    private appLoggerService: AppLoggerService,
    private commissionService: CommissionService
  ) {
    this.appLoggerService.setContext('StripeService');
  }

  async createBankAccountToken(
    bankAccount: Stripe.TokenCreateParams
  ): Promise<Stripe.Token> {
    this.appLoggerService.log(
      `Create a bank account token in Stripe`,
      'StripeService'
    );
    return await this.stripe.tokens.create(bankAccount);
  }

  async createCustomerSource(
    customer: string,
    token: Stripe.CustomerSourceCreateParams
  ): Promise<Stripe.CustomerSource> {
    this.appLoggerService.log(
      `Create a customer source in Stripe to ${customer}`,
      'StripeService'
    );
    return await this.stripe.customers.createSource(customer, token);
  }

  async createExternalAccount(
    account: string,
    accountToken: Stripe.ExternalAccountCreateParams
  ): Promise<Stripe.BankAccount | Stripe.Card> {
    this.appLoggerService.log(
      `Create an external account in Stripe to the account: ${account}`,
      'StripeService'
    );
    return await this.stripe.accounts.createExternalAccount(
      account,
      accountToken
    );
  }

  async createAccount(
    user: Stripe.AccountCreateParams
  ): Promise<Stripe.Account> {
    this.appLoggerService.log(
      `Create an account in Stripe to ${user.email}`,
      'StripeService'
    );
    return await this.stripe.accounts.create(user);
  }

  async createCustomer(
    user: Stripe.CustomerCreateParams
  ): Promise<Stripe.Customer> {
    this.appLoggerService.log(
      `Create a customer in Stripe to ${user.email}`,
      'StripeService'
    );
    return await this.stripe.customers.create(user);
  }

  async assignBankAccount(userBankAccount): Promise<any> {
    this.appLoggerService.log(
      `Assign a bank account in Stripe to ${userBankAccount.user.customerStripe}`,
      'StripeService'
    );

    const tokenAccount = await this.createBankAccountToken(
      userBankAccount.bankAccount
    );

    const externalAccount = await this.createExternalAccount(
      userBankAccount.user.accountStripe,
      {
        external_account: tokenAccount.id,
      }
    );

    const tokenCustomer = await this.createBankAccountToken(
      userBankAccount.bankAccount
    );

    const customerSource = await this.createCustomerSource(
      userBankAccount.user.customerStripe,
      {
        source: tokenCustomer.id,
      }
    );

    return { externalAccount, customerSource };
  }

  async deleteCustomerSource(
    customer: string,
    bankAccount: string
  ): Promise<any> {
    this.appLoggerService.log(
      `Delete a customer source in Stripe: ${customer} - ${bankAccount}`,
      'StripeService'
    );
    return await this.stripe.customers.deleteSource(customer, bankAccount);
  }

  async deleteExternalAccount(
    account: string,
    bankAccount: string
  ): Promise<any> {
    this.appLoggerService.log(
      `Delete an external account in Stripe: ${account} - ${bankAccount}`,
      'StripeService'
    );
    return await this.stripe.accounts.deleteExternalAccount(
      account,
      bankAccount
    );
  }

  async deleteBankAccount(userBankAccount): Promise<any> {
    this.appLoggerService.log(
      `Delete a bank account in Stripe to ${userBankAccount.customerStripe}`,
      'StripeService'
    );

    const deleteExternalAccount = await this.deleteExternalAccount(
      userBankAccount.accountStripe,
      userBankAccount.externalAccountStripe
    );

    const deleteCustomerSource = await this.deleteCustomerSource(
      userBankAccount.customerStripe,
      userBankAccount.customerSourceStripe
    );

    return { deleteExternalAccount, deleteCustomerSource };
  }

  getAmmounts(): Object {
    this.appLoggerService.log('Generate random amounts', 'StripeService');

    const amountTotal = StripeConst.verifyAmountTotal;
    const amountMin = StripeConst.verifyAmountMin;
    const amountMax = amountTotal - amountMin;

    const amount1 =
      Math.floor(Math.random() * (amountMax - amountMin)) + amountMin;
    const amount2 = amountTotal - amount1;

    this.appLoggerService.debug(
      `Amount 1: ${amount1 / 100}. Amount 2: ${amount2 / 100}`,
      'StripeService'
    );

    return { amount1, amount2 };
  }

  async verifyBankAccount(userBankAccount) {
    this.appLoggerService.log(
      `Verify a bank account in Stripe to ${userBankAccount.customer}`,
      'StripeService'
    );

    // const amounts = this.getAmmounts();
    const amounts = StripeConst.verifyAmountsDevelop;

    return await this.stripe.customers.verifySource(
      userBankAccount.customer,
      userBankAccount.bankAccount,
      {
        amounts: [amounts.amount1, amounts.amount2],
      }
    );
  }

  getCommission(
    amount: number,
    commissionService: number,
    commissionProcessor: number
  ) {
    this.appLoggerService.log(
      `Generate commission to the amount: ${amount}`,
      'StripeService'
    );
    const com = amount * (commissionService / 100) + commissionProcessor;
    return com;
  }

  async captureCharge(chargeId: string): Promise<Stripe.Charge> {
    this.appLoggerService.log(
      `Capture a charge ${chargeId} in Stripe`,
      'StripeService'
    );

    return await this.stripe.charges.retrieve(chargeId);
  }

  async createCharge(charge): Promise<Stripe.Charge> {
    this.appLoggerService.log(
      `Create a charge in Stripe to ${charge.customer}`,
      'StripeService'
    );

    const commissionActual = await this.commissionService.findLastCommission();

    const commission = this.getCommission(
      charge.amount,
      Number(commissionActual.serviceCharge),
      Number(commissionActual.processor)
    );
    const amountTotal = Math.floor((charge.amount + commission) * 100);

    const chargeResult = await this.stripe.charges.create({
      customer: charge.customer,
      source: charge.source,
      amount: amountTotal,
      currency: 'usd',
    });

    /*this.tasksService.addCronJob(
      `ChargeCronJob-${chargeResult.id}`,
      chargeResult.id
    );*/

    return chargeResult;
  }

  async createTransfer(transfer): Promise<Stripe.Transfer> {
    this.appLoggerService.log(
      `Create a tranfer in Stripe to ${transfer.account}`,
      'StripeService'
    );

    const commissionActual = await this.commissionService.findLastCommission();

    const commission = this.getCommission(
      transfer.amount,
      Number(commissionActual.serviceTransfer),
      Number(commissionActual.processor)
    );
    const amountTotal = Math.floor((transfer.amount - commission) * 100);

    return await this.stripe.transfers.create({
      amount: amountTotal,
      currency: 'usd',
      destination: transfer.account,
      source_type: 'bank_account',
    });
  }

  validateRoutingNumber(routingNumber: string): boolean {
    this.appLoggerService.log(
      `Validate routing number ${routingNumber}`,
      'StripeService'
    );
    let sum = 0;
    for (let i = 0; i < routingNumber.length; i += 3) {
      sum +=
        parseInt(routingNumber.charAt(i), 10) * 3 +
        parseInt(routingNumber.charAt(i + 1), 10) * 7 +
        parseInt(routingNumber.charAt(i + 2), 10);
    }

    if (sum != 0 && sum % 10 == 0) return true;
    else return false;
  }
}
