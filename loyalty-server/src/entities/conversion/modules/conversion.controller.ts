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

import { ConversionService } from './conversion.service';
import { CreateConversionDTO } from '../models/dto/create-conversion.dto';
import { UpdateConversionDTO } from '../models/dto/update-conversion.dto';
import { Conversion } from '../models/conversion.entity';
import { AppLoggerService } from 'src/logger/app-logger.service';

@Controller('conversion')
//@UseGuards(AuthGuard('jwt'))
export class ConversionController {
  constructor(
    private conversionService: ConversionService,
    private appLoggerService: AppLoggerService
  ) {
    this.appLoggerService.setContext('ConversionController');
  }

  @Get()
  findAll(): Promise<Conversion[]> {
    this.appLoggerService.log(
      'Return all the conversions',
      'ConversionController'
    );
    return this.conversionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Conversion> {
    this.appLoggerService.log('Return one conversion', 'ConversionController');
    return this.conversionService.findOne(id);
  }

  @Post()
  async create(
    @Body() conversionData: CreateConversionDTO
  ): Promise<Conversion> {
    this.appLoggerService.log('Create a conversion', 'ConversionController');
    return this.conversionService.create(conversionData);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() conversionData: UpdateConversionDTO
  ): Promise<UpdateResult> {
    this.appLoggerService.log('Update a conversion', 'ConversionController');
    return this.conversionService.update(Number(id), conversionData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    this.appLoggerService.log('Delete a conversion', 'ConversionController');
    return this.conversionService.delete(id);
  }
}
