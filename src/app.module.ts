import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsController } from 'src/controllers/items/items.controller';
import { ItemsService } from 'src/controllers/items/items.service';
import { ItemsModule } from 'src/controllers/items/items.module';

import { AuthController } from 'src/controllers/auth/auth.controller';
import { AuthService } from 'src/controllers/auth/auth.service';
import { AuthModule } from 'src/controllers/auth/auth.module';
import { AppKeys } from './config/keys';

@Module({
  imports: [
    AuthModule,
    ItemsModule,
    MongooseModule.forRoot(AppKeys.MONGO_URI, { useNewUrlParser: true }),
  ],
  controllers: [AppController, ItemsController, AuthController],
  providers: [AppService, ItemsService, AuthService],
})
export class AppModule {}
