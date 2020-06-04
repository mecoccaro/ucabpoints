import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { Role } from '../models/role.entity';
import { AppLoggerModule } from '../../../logger/app-logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([Role]), AppLoggerModule],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
