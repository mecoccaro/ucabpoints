import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

import { CreatePlaceDTO } from '../models/dto/create-place.dto';
import { UpdatePlaceDTO } from '../models/dto/update-place.dto';
import { Place } from '../models/place.entity';
import { AppLoggerService } from 'src/logger/app-logger.service';

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(Place)
    private placeRepository: Repository<Place>,
    private appLoggerService: AppLoggerService
  ) {
    this.appLoggerService.setContext('PlaceService');
  }

  findAllOfAType(type: string): Promise<Place[]> {
    this.appLoggerService.log(
      `Return all the places of a type: ${type}`,
      `PlaceService`
    );
    return this.placeRepository.find({ placeType: type });
  }

  findAllOfIdType(id: number, type: string): Promise<Place[]> {
    this.appLoggerService.log(
      `Return all the places of an id and type: ${id} - ${type}`,
      `PlaceService`
    );
    return this.placeRepository.find({ place: id, placeType: type });
  }

  async findOne(id: number): Promise<Place> {
    this.appLoggerService.log(`Return one place: ${id}`, `PlaceService`);
    return await this.placeRepository.findOne(id);
  }

  async findAll(): Promise<Place[]> {
    this.appLoggerService.log(`Return all the places`, `PlaceService`);
    return await this.placeRepository.find();
  }

  async create(placeData: CreatePlaceDTO): Promise<Place> {
    this.appLoggerService.log(
      `Create a place: ${placeData.name}`,
      `PlaceService`
    );
    return await this.placeRepository.save(placeData);
  }

  async update(id: number, placeData: UpdatePlaceDTO): Promise<UpdateResult> {
    this.appLoggerService.log(`Update a place: ${id}`, `PlaceService`);
    return await this.placeRepository.update(id, placeData);
  }

  async delete(id: number): Promise<DeleteResult> {
    this.appLoggerService.log(`Delete a place: ${id}`, `PlaceService`);
    return await this.placeRepository.delete(id);
  }
}
