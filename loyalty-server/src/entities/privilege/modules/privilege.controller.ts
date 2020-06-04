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

import { PrivilegeService } from './privilege.service';
import { CreatePrivilegeDTO } from '../models/dto/create-privilege.dto';
import { UpdatePrivilegeDTO } from '../models/dto/update-privilege.dto';
import { Privilege } from '../models/privilege.entity';
import { AppLoggerService } from 'src/logger/app-logger.service';

@Controller('privilege')
@UseGuards(AuthGuard('jwt'))
export class PrivilegeController {
  constructor(
    private privilegeService: PrivilegeService,
    private appLoggerService: AppLoggerService
  ) {
    this.appLoggerService.setContext('PrivilegeController');
  }

  @Get()
  findAll(): Promise<Privilege[]> {
    this.appLoggerService.log(
      'Return all the privileges',
      'PrivilegeController'
    );
    return this.privilegeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Privilege> {
    this.appLoggerService.log('Return one privilege', 'PrivilegeController');
    return this.privilegeService.findOne(id);
  }

  @Post()
  async create(@Body() planData: CreatePrivilegeDTO): Promise<Privilege> {
    this.appLoggerService.log('Create a privilege', 'PrivilegeController');
    return this.privilegeService.create(planData);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() planData: UpdatePrivilegeDTO
  ): Promise<UpdateResult> {
    this.appLoggerService.log('Update a privilege', 'PrivilegeController');
    return this.privilegeService.update(Number(id), planData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    this.appLoggerService.log('Delete a privilege', 'PrivilegeController');
    return this.privilegeService.delete(id);
  }
}
