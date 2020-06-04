import {
  Controller,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Get,
  UseGuards,
} from '@nestjs/common';
import { UpdateResult, DeleteResult } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';

import { LoyaltyUserService } from './loyalty-user.service';
import { CreateLoyaltyUserDTO } from '../models/dto/create-loyalty-user.dto';
import { UpdateLoyaltyUserDTO } from '../models/dto/update-loyalty-user.dto';
import { LoyaltyUser } from '../models/loyalty-user.entity';
import { AppLoggerService } from 'src/logger/app-logger.service';

@Controller('loyalty-user')
//@UseGuards(AuthGuard('jwt'))
export class LoyaltyUserController {
  constructor(
    private loyaltyUserService: LoyaltyUserService,
    private appLoggerService: AppLoggerService
  ) {
    this.appLoggerService.setContext('LoyaltyUserController');
  }

  @Get('email/:email')
  findUserByEmail(@Param('email') email: string): Promise<LoyaltyUser> {
    this.appLoggerService.log(
      'Return the loyalty-user by email',
      'LoyaltyUserController'
    );
    return this.loyaltyUserService.findUserByEmail(email);
  }

  @Get()
  findAll(): Promise<LoyaltyUser[]> {
    this.appLoggerService.log(
      'Return all the loyalty-users',
      'LoyaltyUserController'
    );
    return this.loyaltyUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<LoyaltyUser> {
    this.appLoggerService.log(
      'Return one loyalty-user',
      'LoyaltyUserController'
    );
    return this.loyaltyUserService.findOne(id);
  }

  @Post()
  async create(
    @Body() loyaltyUserData: CreateLoyaltyUserDTO
  ): Promise<LoyaltyUser> {
    this.appLoggerService.log('Create a loyalty-user', 'LoyaltyUserController');
    return this.loyaltyUserService.create(loyaltyUserData);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() loyaltyUserData: UpdateLoyaltyUserDTO
  ): Promise<UpdateResult> {
    this.appLoggerService.log('Update a loyalty-user', 'LoyaltyUserController');
    return this.loyaltyUserService.update(Number(id), loyaltyUserData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    this.appLoggerService.log('Delete a loyalty-user', 'LoyaltyUserController');
    return this.loyaltyUserService.delete(id);
  }
}
