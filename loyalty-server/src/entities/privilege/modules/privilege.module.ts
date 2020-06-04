import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PrivilegeController } from './privilege.controller';
import { PrivilegeService } from './privilege.service';
import { Privilege } from '../models/privilege.entity';
import { AppLoggerModule } from '../../../logger/app-logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([Privilege]), AppLoggerModule],
  controllers: [PrivilegeController],
  providers: [PrivilegeService],
})
export class PrivilegeModule {}
