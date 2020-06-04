import { Controller,  Post, Put, Delete, Body, Param, Get, UseGuards } from '@nestjs/common';
import {AppLoggerService} from "../../logger/app-logger.service";
import {AdminService} from "./admin.service";
import { AuthGuard } from '@nestjs/passport';
import {UpdatePersonDTO} from "../../entities/person/models/dto/update-person.dto";
import {DeleteResult, UpdateResult} from "typeorm";
import {CreatePersonDTO} from "../../entities/person/models/dto/create-person.dto";
import {UpdateAccountDTO} from "../../entities/account/models/dto/update-account.dto";

import {Person} from "../../entities/person/models/person.entity";
import {PersonService} from "../../entities/person/modules/person.service";
import {Account} from "../../entities/account/models/account.entity";
import {AccountService} from "../../entities/account/modules/account.service";
import {Transaction} from "../../entities/transaction/models/transaction.entity";
import {TransactionService} from "../../entities/transaction/modules/transaction.service";
import {TransactionStatus} from "../../entities/transaction-status/models/transaction-status.entity";
import {TransactionStatusService} from "../../entities/transaction-status/modules/transaction-status.service";
import {Status} from "../../entities/status/models/status.entity";
import {StatusService} from "../../entities/status/modules/status.service";

@Controller('admin')
export class AdminController {
    constructor(
        private appLoggerService: AppLoggerService,
        private adminService: AdminService,
        private personService: PersonService,
        private accountService: AccountService,
        private transactionService: TransactionService,
        private transactionStatusService: TransactionStatusService,
        private statusService: StatusService
    ) {
        appLoggerService.setContext('BackOfficeController');
    }

    // User management //

    @Get('/user')
    findAllUser(): Promise<Person[]> {
        this.appLoggerService.log('Return all the users', 'adminController');
        return this.personService.findAll();
    }

    @Get('/user/:id')
    findOneUser(@Param('id') id: number): Promise<Person>{
        this.appLoggerService.log('Return one user','adminController');
        return this.personService.findOne(id);
    }

    @Put('/user/:id')
    async updateUser(@Param (':id') id: number,
                 @Body() personData: UpdatePersonDTO): Promise<UpdateResult>{
        this.appLoggerService.log('Update a user','adminController');
        return this.personService.update(Number(id), personData);
    }

    @Delete(':id')
    async deletUsere(@Param('id') id: number): Promise<DeleteResult> {
        this.appLoggerService.log('Delete a person', 'adminController');
        return this.personService.delete(id);
    }

    // Account management //

    @Get('/account')
    findAllAccount(): Promise<Account[]>{
        this.appLoggerService.log('Return all accounts','adminController');
        return this.accountService.findAll();
    }

    @Get('/account/:id')
    findOneAccount(@Param('id') id: number): Promise<Account> {
        this.appLoggerService.log('Return one account', 'adminController');
        return this.accountService.findOne(id);
    }

    @Put('/account/:id')
    async updateAccount(
        @Param('id') id: number,
        @Body() accountData: UpdateAccountDTO
    ): Promise<UpdateResult> {
        this.appLoggerService.log('Udate an account', 'adminController');
        return this.accountService.update(Number(id), accountData);
    }

    @Delete('/account/:id')
    async deleteAccount(@Param('id') id: number): Promise<DeleteResult> {
        this.appLoggerService.log('Delete an account', 'adminController');
        return this.accountService.delete(id);
    }

    //Transaction management//

    @Get('/transaction')
    findAllTransaction(): Promise<Transaction[]> {
        this.appLoggerService.log('Return all the transactions', 'adminController');
        return this.transactionService.findAll();
    }

    @Get('/transaction/:id')
    findOneTransaction(@Param('id') id: number): Promise<Transaction> {
        this.appLoggerService.log('Return one transaction', 'adminController');
        return this.transactionService.findOne(id);
    }

    @Delete(':id')
    async deleteTransaction(@Param('id') id: number): Promise<DeleteResult> {
        this.appLoggerService.log('Delete a transaction', 'TransactionController');
        return this.transactionService.delete(id);
    }

    @Get('/transaction/status/:id')
    findOneTransactionStatus(@Param('id')id:number): Promise<TransactionStatus>{
        this.appLoggerService.log('Return one transaction-status','adminController');
        return this.transactionStatusService.findOne(id);
    }

    @Get('/transaction/status/:tid/:id')
    findOneStatus(@Param('tid')tid:number, @Param('id')id:number): Promise<Status>{
        this.appLoggerService.log('Return one status','adminController');
        return this.statusService.findOne(id);
    }

}
