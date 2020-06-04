import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AppLoggerService } from 'src/logger/app-logger.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private appLoggerService: AppLoggerService) {
    this.appLoggerService.setContext('AllExceptionsFilter');
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    this.appLoggerService.error(`ERROR: ${exception}`, 'AllExceptionsFilter');

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
