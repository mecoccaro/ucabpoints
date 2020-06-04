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

import { CreateUserStatusDTO } from '../models/dto/create-user-status.dto';
import { UpdateUserStatusDTO } from '../models/dto/update-user-status.dto';
import { UserStatus } from '../models/user-status.entity';
import { AppLoggerService } from 'src/logger/app-logger.service';
import { UserStatusService } from './user-status.service';

@Controller('user-status')
//@UseGuards(AuthGuard('jwt'))
export class UserStatusController {
  constructor(
    private userStatusService: UserStatusService,
    private appLoggerService: AppLoggerService
  ) {
    this.appLoggerService.setContext('UserStatusController');
  }

  @Get('user/:userId')
  findOneByUser(@Param('userId') userId: number): Promise<UserStatus> {
    this.appLoggerService.log(
      'Return one user-status by user',
      'UserStatusController'
    );
    return this.userStatusService.findOneByUser(userId);
  }

  @Get()
  findAll(): Promise<UserStatus[]> {
    this.appLoggerService.log(
      'Return all the user-status',
      'UserStatusController'
    );
    return this.userStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<UserStatus> {
    this.appLoggerService.log('Return one user-status', 'UserStatusController');
    return this.userStatusService.findOne(id);
  }

  @Post()
  async create(
    @Body() userStatusData: CreateUserStatusDTO
  ): Promise<UserStatus> {
    this.appLoggerService.log('Create a user-status', 'UserStatusController');
    return this.userStatusService.create(userStatusData);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() userStatusData: UpdateUserStatusDTO
  ): Promise<UpdateResult> {
    this.appLoggerService.log('Update a user-status', 'UserStatusController');
    return this.userStatusService.update(Number(id), userStatusData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    this.appLoggerService.log('Delete a user-status', 'UserStatusController');
    return this.userStatusService.delete(id);
  }
}
