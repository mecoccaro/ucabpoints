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

import { StatusService } from './status.service';
import { CreateStatusDTO } from '../models/dto/create-status.dto';
import { UpdateStatusDTO } from '../models/dto/update-status.dto';
import { Status } from '../models/status.entity';
import { AppLoggerService } from 'src/logger/app-logger.service';

@Controller('status')
//@UseGuards(AuthGuard('jwt'))
export class StatusController {
  constructor(
    private statusService: StatusService,
    private appLoggerService: AppLoggerService
  ) {
    this.appLoggerService.setContext('StatusController');
  }

  @Get()
  findAll(): Promise<Status[]> {
    this.appLoggerService.log('Return all the status', 'StatusController');
    return this.statusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Status> {
    this.appLoggerService.log('Return one status', 'StatusController');
    return this.statusService.findOne(id);
  }

  @Get('name-type/:name/:type')
  findOneByNameType(
    @Param('name') name: string,
    @Param('type') type: string
  ): Promise<Status> {
    this.appLoggerService.log(
      'Return one status by name and type',
      'StatusController'
    );
    return this.statusService.findOneByNameType(name, type);
  }

  @Post()
  async create(@Body() statusData: CreateStatusDTO): Promise<Status> {
    this.appLoggerService.log('Create a status', 'StatusController');
    return this.statusService.create(statusData);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() statusData: UpdateStatusDTO
  ): Promise<UpdateResult> {
    this.appLoggerService.log('Update a status', 'StatusController');
    return this.statusService.update(Number(id), statusData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    this.appLoggerService.log('Delete a status', 'StatusController');
    return this.statusService.delete(id);
  }
}
