import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PlaceController } from './place.controller';
import { PlaceService } from './place.service';
import { Place } from '../models/place.entity';
import { AppLoggerModule } from '../../../logger/app-logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([Place]), AppLoggerModule],
  controllers: [PlaceController],
  providers: [PlaceService],
})
export class PlaceModule {}
