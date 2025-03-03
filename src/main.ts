import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as connectMongo from 'connect-mongodb-session';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const MongoStore = connectMongo(session);
  const store = new MongoStore({
    uri: 'mongodb+srv://username:A5RZBXFLsCZ9vU36@cluster0.ldq0n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    collection: 'sessions',
  });
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.useStaticAssets(join(__dirname, '..', 'uploads'), { prefix: '/uploads' });
  app.setViewEngine('hbs');

  app.use(
    session({
      secret: 'mysecretKey',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false },
      store: store,
    }),
  );
  app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
  });
  app.use(cookieParser());
  await app.listen(10000, '0.0.0.0');
}
bootstrap();
