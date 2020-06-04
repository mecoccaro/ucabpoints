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

import { PlaceService } from './place.service';
import { CreatePlaceDTO } from '../models/dto/create-place.dto';
import { UpdatePlaceDTO } from '../models/dto/update-place.dto';
import { Place } from '../models/place.entity';
import { AppLoggerService } from 'src/logger/app-logger.service';

@Controller('place')
// @UseGuards(AuthGuard('jwt'))
export class PlaceController {
  constructor(
    private placeService: PlaceService,
    private appLoggerService: AppLoggerService
  ) {
    this.appLoggerService.setContext('PlaceController');
  }

  @Get('type/:type')
  findAllOfAType(@Param('type') type: string): Promise<Place[]> {
    this.appLoggerService.log(
      'Return all the places of a type',
      'PlaceController'
    );
    return this.placeService.findAllOfAType(type);
  }

  @Get('idtype/:id/:type')
  findAllOfIdType(
    @Param('id') id: number,
    @Param('type') type: string
  ): Promise<Place[]> {
    this.appLoggerService.log(
      'Return all the places of an id and type',
      'PlaceController'
    );
    return this.placeService.findAllOfIdType(id, type);
  }

  @Get()
  findAll(): Promise<Place[]> {
    this.appLoggerService.log('Return all the places', 'PlaceController');
    return this.placeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Place> {
    this.appLoggerService.log('Return one place', 'PlaceController');
    return this.placeService.findOne(id);
  }

  @Post()
  async create(@Body() placeData: CreatePlaceDTO): Promise<Place> {
    this.appLoggerService.log('Create a place', 'PlaceController');
    return this.placeService.create(placeData);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() placeData: UpdatePlaceDTO
  ): Promise<UpdateResult> {
    this.appLoggerService.log('Update a place', 'PlaceController');
    return this.placeService.update(Number(id), placeData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    this.appLoggerService.log('Delete a place', 'PlaceController');
    return this.placeService.delete(id);
  }
}
