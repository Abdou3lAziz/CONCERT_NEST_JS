import {
  Module,
  NestModule,
  RequestMethod,
  MiddlewareConsumer,
} from '@nestjs/common';
import { AdminMiddleware } from './middleware/session-check.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ConcertModule } from './concert/concert.module';
import { HomeModule } from './home/home.module';
import { MulterModule } from '@nestjs/platform-express';
import { MailerModule } from '@nestjs-modules/mailer';
import { AdminModule } from './admin/admin.module';
import { ReservationModule } from './reservation/reservation.module';
import { AdminController } from './admin/admin.controller';

@Module({
  imports: [
    ConcertModule,
    UsersModule,
    HomeModule,
    ReservationModule,
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(
      `mongodb+srv://username:A5RZBXFLsCZ9vU36@cluster0.ldq0n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
    ),
    MulterModule.register({
      dest: './uploads',
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
    }),
    AdminModule,
    ReservationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminMiddleware)
      .forRoutes({ path: 'concert', method: RequestMethod.ALL });
    consumer.apply(AdminMiddleware).forRoutes(AdminController);
  }
}
