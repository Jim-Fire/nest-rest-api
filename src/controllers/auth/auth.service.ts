import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, JwtPayload } from 'src/types';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async createToken() {
    const user: JwtPayload = {
      email: 'test@email.com',
      someValue: 42,
    };
    const accessToken = this.jwtService.sign(user, {
      // expiresIn: 3600,
    });

    return {
      accessToken,
    };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    // put some validation logic here
    // for example query user by id/email/username

    console.log('payload', payload);
    return { result: true };
  }

  async createNewUser(){

  }
}
