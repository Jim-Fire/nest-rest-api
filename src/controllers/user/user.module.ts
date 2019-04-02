import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/models/user.schema';
import { Schema } from 'src/models/schemas';
import { UserService } from './user.service';
import { AppKeys } from 'src/config/keys';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Schema.USER, schema: UserSchema }])
  ],
  providers: [UserService],
})
export class UserModule {}
