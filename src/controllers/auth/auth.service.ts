import * as bcrypt from 'bcryptjs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, Body, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  User,
  JwtPayload,
  Role,
  AppRoles,
  PromisedResponse,
  ServerErrorResponse,
  ServerResponse,
  AuthResponse,
  AuthTokenResponse,
} from 'src/types';
import { CreateUserDto } from './dto/create-user.dto';
import { apiMessages } from 'src/util';
import { Schema } from 'src/models/schemas';
import { AuthUserDto } from './dto/auth-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(Schema.USER) private readonly userModel: Model<User>,
  ) {}

  async createNewUser(newuser: CreateUserDto): PromisedResponse<boolean> {
    try {
      const { email } = newuser;
      const exist = await this.userModel.findOne({ email });

      if (exist) {
        return new ServerErrorResponse(apiMessages.userExist, HttpStatus.BAD_REQUEST);
      }

      const userRole = new Role(AppRoles.USER, 'User');

      const user = new this.userModel({
        ...newuser,
        roles: [{...userRole}],
      });

      return new Promise((res, rej) => {
        try {
          bcrypt.genSalt(10, (e, salt) => {
            if (e) {
              rej(new ServerErrorResponse(e.message));
            }
            bcrypt.hash(user.password, salt, async (e, hash) => {
              if (e) {
                rej(new ServerErrorResponse(e.message));
              }

              // Hash Password
              user.password = hash;

              // Save User
              await user.save();
              res(new ServerResponse(true, true));
            });
          });
        } catch (e) {
          rej(new ServerErrorResponse(e.message));
        }
      });
    } catch (e) {
      return new ServerErrorResponse(e.message);
    }
  }

  async authenticate(userDto: AuthUserDto): PromisedResponse<AuthTokenResponse> {
    try {
      const { email, password } = userDto;

      // Get user by email
      const user: User = await this.userModel.findOne({ email });

      const compared = await this.comparePassword(password, user.password);

      if (compared.result) {
        const payload: JwtPayload = {
          email: userDto.email,
        };

        const accessToken = this.jwtService.sign(payload, {
          // expiresIn: 3600,
        });

        return new AuthResponse(accessToken, user);
      } else if (compared.error) {
        return new ServerErrorResponse(compared.error.message);
      } else {
        return new ServerErrorResponse(apiMessages.userWrongPassword, HttpStatus.BAD_REQUEST);
      }
    } catch (e) {
      return new ServerErrorResponse(e.message);
    }
  }

  async findUserFromTokenMiddleware(payload: JwtPayload): Promise<User> {
    const { email } = payload;

    return await this.userModel.findOne({ email });
  }

  async comparePassword(password: string, hash: string): Promise<{ result: boolean; error?: any }> {
    return new Promise((res, rej) => {
      // Match Password
      bcrypt.compare(password, hash, (err, isMatch) => {
        if (err) {
          res({ result: false, error: err });
        }
        res({ result: isMatch });
      });
    });
  }

}
