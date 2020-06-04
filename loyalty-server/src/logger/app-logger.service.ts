import { Logger, Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class AppLoggerService extends Logger {
  log(message: string, context: string) {
    super.setContext(context);
    super.log(message);
  }

  error(message: string, context: string, trace?: string) {
    super.setContext(context);
    super.error(message);
  }

  warn(message: string, context: string) {
    super.setContext(context);
    super.warn(message);
  }

  debug(message: string, context: string) {
    super.setContext(context);
    super.debug(message);
  }

  verbose(message: string, context: string) {
    super.setContext(context);
    super.verbose(message);
  }

  setContext(context: string) {
    super.setContext(context);
  }
}
