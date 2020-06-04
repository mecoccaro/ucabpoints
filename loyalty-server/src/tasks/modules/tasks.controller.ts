import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AppLoggerService } from 'src/logger/app-logger.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
//@UseGuards(AuthGuard('jwt'))
export class TasksController {
  constructor(
    private tasksService: TasksService,
    private appLoggerService: AppLoggerService
  ) {
    this.appLoggerService.setContext('TasksController');
  }

  @Post('charge')
  addCronJob(@Body() task) {
    this.appLoggerService.log(`Add a task for the charge`, 'TasksService');
    this.tasksService.addCronJob(task.name, task.chargeId);
  }
}
