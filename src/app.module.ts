import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CurrentUserMiddleware } from './middleware/currentUserMiddleware';
import { ThrottlerModule } from '@nestjs/throttler';
import { CompressionMiddleware } from './middleware/compression';
import { APP_FILTER } from '@nestjs/core';
import { GlobalErrorHandler } from './middleware/globalError';

@Module({
  imports: [
    TaskModule,
    MongooseModule.forRoot(
      'mongodb+srv://mahmoudwardany18:mahmoudwardany18@cluster0.pl5hhnd.mongodb.net/task?retryWrites=true&w=majority',
    ),
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ConfigModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 10,
      },
    ]),
  ],
  providers: [
    ConfigService,
    {
      provide: APP_FILTER,
      useClass: GlobalErrorHandler,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Apply CurrentUserMiddleware to all routes
    consumer
      .apply(CurrentUserMiddleware)
      .exclude(
        { path: 'auth/login', method: RequestMethod.ALL },
        { path: 'auth/register', method: RequestMethod.ALL },
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL });

    // Apply CompressionMiddleware to all routes
    consumer.apply(CompressionMiddleware).forRoutes('*');
  }
}
