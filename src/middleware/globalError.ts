import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class GlobalErrorHandler implements ExceptionFilter {
  catch(error: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal Server Error';

    if (error instanceof HttpException) {
      status = error.getStatus();
      message = error.getResponse()['message'] || 'An error occurred';
    }

    const isDev = process.env.NODE_ENV === 'development';

    if (isDev) {
      response.status(status).json({
        status: 'error',
        message: message,
        stack: isDev ? error.stack : undefined,
      });
    } else {
      response.status(status).json({
        status: 'error',
        message: message,
      });
    }
  }
}
