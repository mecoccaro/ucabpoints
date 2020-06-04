import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConversionController } from './conversion.controller';
import { ConversionService } from './conversion.service';
import { Conversion } from '../models/conversion.entity';
import { AppLoggerModule } from '../../../logger/app-logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([Conversion]), AppLoggerModule],
  controllers: [ConversionController],
  providers: [ConversionService],
})
export class ConversionModule {}
