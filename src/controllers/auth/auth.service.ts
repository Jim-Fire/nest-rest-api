import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/types';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async createToken() {
    const user: JwtPayload = {
      email: 'test@email.com',
      someValue: 42,
    };
    const accessToken = this.jwtService.sign(user, {
      expiresIn: 3600,
    });

    return {
      accessToken
    };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    // put some validation logic here
    // for example query user by id/email/username

    console.log('payload', payload);
    return { result: true };
  }
}
