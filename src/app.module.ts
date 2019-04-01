import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppKeys } from './config/keys';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ItemsController } from 'src/controllers/items/items.controller';
import { ItemsService } from 'src/controllers/items/items.service';
import { ItemsModule } from 'src/controllers/items/items.module';

import { AuthController } from 'src/controllers/auth/auth.controller';
import { AuthService } from 'src/controllers/auth/auth.service';
import { JwtStrategy } from 'src/controllers/auth/jwt.strategy';
import { AuthModule } from 'src/controllers/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    ItemsModule,
    MongooseModule.forRoot(AppKeys.MONGO_URI, { useNewUrlParser: true }),
  ],
  controllers: [AppController, ItemsController, AuthController],
  providers: [
    AppService,
    ItemsService,
    AuthService,
    JwtStrategy,
  ],
})
export class AppModule {}
