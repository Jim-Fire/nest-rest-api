import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/models/user.schema';
import { Schema } from 'src/models/schemas';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AppKeys } from 'src/config/keys';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: AppKeys.JWT_SECRET,
    }),
    MongooseModule.forFeature([{ name: Schema.USER, schema: UserSchema }])
  ],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
