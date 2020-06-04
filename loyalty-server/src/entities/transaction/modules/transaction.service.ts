import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult, In } from 'typeorm';

import { CreateTransactionDTO } from '../models/dto/create-transaction.dto';
import { UpdateTransactionDTO } from '../models/dto/update-transaction.dto';
import { Transaction } from '../models/transaction.entity';
import { AppLoggerService } from 'src/logger/app-logger.service';
import { Account } from 'src/entities/account/models/account.entity';
import { AccountService } from 'src/entities/account/modules/account.service';
import { StatusService } from 'src/entities/status/modules/status.service';
import { TransactionStatusService } from 'src/entities/transaction-status/modules/transaction-status.service';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    private appLoggerService: AppLoggerService,
    private accountService: AccountService,
    private statusService: StatusService,
    private transactionStatusService: TransactionStatusService
  ) {
    this.appLoggerService.setContext('TransactionService');
  }

  async findOne(id: number): Promise<Transaction> {
    this.appLoggerService.log(
      `Return one transaction: ${id}`,
      `TransactionService`
    );
    return await this.transactionRepository.findOne(id);
  }

  async findAll(): Promise<Transaction[]> {
    this.appLoggerService.log(
      `Return all the transactions`,
      `TransactionService`
    );
    return await this.transactionRepository.find();
  }

  async findTransactionsByAccountType(
    account: number,
    type: string
  ): Promise<Transaction[]> {
    this.appLoggerService.log(
      `Return the transactions by the account and type: ${account} - ${type}`,
      `TransactionService`
    );
    const transaction = await this.transactionRepository.find({
      transactionType: type,
      account,
    });

    if (type === 'VERIFY_ACCOUNT') {
      for (let i = 0; i < transaction.length; i++) {
        this.appLoggerService.debug(
          `${transaction[i].observation.toUpperCase()}: ${
            transaction[i].totalAmount
          }`,
          `TransactionService`
        );
      }
    }

    return transaction;
  }

  async findTransactionsByAccount(account: number): Promise<Transaction[]> {
    this.appLoggerService.log(
      `Return the transactions by the account: ${account}`,
      `TransactionService`
    );
    const transaction = await this.transactionRepository.find({
      account,
    });

    return transaction;
  }

  async findTransactionsByTransactionStripe(
    transactionStripe: string
  ): Promise<Transaction> {
    this.appLoggerService.log(
      `Return the transactions by the transactionStripe: ${transactionStripe}`,
      `TransactionService`
    );
    return await this.transactionRepository.findOne({ transactionStripe });
  }

  async getTotalPointsUser(user: number): Promise<number> {
    this.appLoggerService.log(
      `Return the points of an user: ${user}`,
      `TransactionService`
    );
    const accounts: Account[] = await this.accountService.findAllByUser(user);
    let account: Account;
    let transactions: Transaction[];
    let transaction: Transaction;
    let points: number = 0;

    for (let i = 0; i < accounts.length; i++) {
      account = accounts[i];
      transactions = await this.transactionRepository.find({
        account: account.id,
      });

      for (let j = 0; j < transactions.length; j++) {
        transaction = transactions[j];
        if (transaction.transactionType === 'BUY_POINTS') {
          points += transaction.points;
        } else if (transaction.transactionType === 'CHANGE_POINTS') {
          points -= transaction.points;
        }
      }
    }

    return points;
  }

  async findAllByStatus(status: string): Promise<Transaction[]> {
    this.appLoggerService.log(
      `Return all the transactions of a status: ${status}`,
      `TransactionService`
    );
    const statusResult = await this.statusService.findOneByNameType(
      status,
      'TRANSACTION'
    );
    const transactionStatus = await this.transactionStatusService.findAllByStatus(
      statusResult.id
    );

    let transactionStatusArray = new Array();
    let transactionStatusArrayId = new Array();
    for (let i = 0; i < transactionStatus.length; i++) {
      transactionStatusArray.push(transactionStatus[i].transaction);
    }
    for (let i = 0; i < transactionStatusArray.length; i++) {
      transactionStatusArrayId.push(transactionStatusArray[i].id);
    }

    return await this.transactionRepository.find({
      id: In(transactionStatusArrayId),
    });
  }

  async create(transactionData: CreateTransactionDTO): Promise<Transaction> {
    this.appLoggerService.log(`Create a transaction`, `TransactionService`);
    return await this.transactionRepository.save(transactionData);
  }

  async update(
    id: number,
    transactionData: UpdateTransactionDTO
  ): Promise<UpdateResult> {
    this.appLoggerService.log(
      `Update a transaction: ${id}`,
      `TransactionService`
    );
    return await this.transactionRepository.update(id, transactionData);
  }

  async delete(id: number): Promise<DeleteResult> {
    this.appLoggerService.log(
      `Delete a transaction: ${id}`,
      `TransactionService`
    );
    return await this.transactionRepository.delete(id);
  }
}
