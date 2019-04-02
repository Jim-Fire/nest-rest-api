import * as bcrypt from 'bcryptjs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, Body, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, JwtPayload, Role, AppRoles } from 'src/types';
import { apiExceptions } from 'src/util';
import { Schema } from 'src/models/schemas';
import { AuthUserDto } from './dto/auth-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(Schema.USER) private readonly userModel: Model<User>,
  ) {}

  async authenticate(user: AuthUserDto): Promise<object | HttpException> {

    const foundUser: User | HttpException = await this.authChallange(user);

    const payload: JwtPayload = {
      email: user.email,
    };
    const accessToken = this.jwtService.sign(payload, {
      // expiresIn: 3600,
    });

    return {
      accessToken,
      user: foundUser,
    };
  }

  async validateUser(payload: JwtPayload): Promise<User> {
    // put some validation logic here
    // for example query user by id/email/username
    const { email } = payload;

    const user: User = await this.userModel.findOne({ email });

    return user;
  }

  async createNewUser(newuser: User): Promise<User | HttpException> {
    const { email } = newuser;
    const exist = await this.userModel.findOne({ email });

    if ( exist ) {
      throw new HttpException(apiExceptions.userExist, HttpStatus.BAD_REQUEST);
    }

    const userRole = new Role(AppRoles.ADMIN, 'Admin');

    const user = new this.userModel({
      ...newuser,
      roles: [{...userRole}],
    });

    return new Promise((res, rej) => {
      bcrypt.genSalt(10, (err, salt) => {
        if(err) {
          rej(new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR));
        }
        bcrypt.hash(user.password, salt, async (err, hash) => {
          if(err) {
            rej(new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR));
          }

          // Hash Password
          user.password = hash;
          // Save User
          try {
            const newUser = await user.save();
            res(newUser);
          } catch (err) {
            rej(new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR));
          }
        });
      });
    });
  }

  async authChallange(userDto: AuthUserDto): Promise<User | HttpException> {
    return new Promise(async (res, rej) => {
      try {
        const { email, password } = userDto;

        // Get user by email
        const user = await this.userModel.findOne({ email });

        // Match Password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            rej(new HttpException(err, HttpStatus.BAD_REQUEST));
          }

          if (isMatch) {
            res(user);
          } else {
            // Pass didn't match
            rej(new HttpException(apiExceptions.userWrongPassword, HttpStatus.BAD_REQUEST));
          }
        });
      } catch (err) {
        // Email not found
        rej(new HttpException(apiExceptions.userNotFound, HttpStatus.BAD_REQUEST));
      }
    });
  }
}
