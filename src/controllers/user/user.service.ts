import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Body, HttpStatus } from '@nestjs/common';
import { User, JwtPayload, ServerResponse, ServerErrorResponse, PromisedResponse } from 'src/types';
import { Schema } from 'src/models/schemas';
import { apiMessages } from 'src/util';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(Schema.USER) private readonly userModel: Model<User>,
  ) {}

  async findAll(): PromisedResponse<User[]> {
    try {
      const users: User[] = await this.userModel.find();
      if (users.length) {
        return new ServerResponse(users, true);
      } else {
        return new ServerErrorResponse(apiMessages.usersNotFound, HttpStatus.NOT_FOUND);
      }
    } catch (e) {
      return new ServerErrorResponse(e.message);
    }
  }

  async delete(id: string): PromisedResponse<User> {
    try {
      const user: User = await this.userModel.findOneAndDelete({
        _id: id,
      });
      if (user) {
        return new ServerResponse(user, true);
      } else {
        return new ServerErrorResponse(apiMessages.userNotFoundById, HttpStatus.NOT_FOUND);
      }
    } catch (e) {
      return new ServerErrorResponse(e.message);
    }
  }

  async update(updateUserDto: UpdateUserDto, id: string): PromisedResponse<User> {
    try {
      const user: User = await this.userModel.findByIdAndUpdate(
        id,
        updateUserDto,
        { new: true },
      );
      if (user) {
        return new ServerResponse(user, true);
      } else {
        return new ServerErrorResponse(apiMessages.userNotFoundById, HttpStatus.NOT_FOUND);
      }
    } catch (e) {
      return new ServerErrorResponse(e.message);
    }
  }

  async findOne(id: string): PromisedResponse<User> {
    try {
      const user: User = await this.userModel.findOne({ _id: id });
      if (user) {
        return new ServerResponse(user, true);
      } else {
        return new ServerErrorResponse(apiMessages.userNotFoundById, HttpStatus.NOT_FOUND);
      }
    } catch (e) {
      return new ServerErrorResponse(e.message);
    }
  }
}
