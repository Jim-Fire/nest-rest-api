import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Body, HttpStatus } from '@nestjs/common';
import { User, JwtPayload, ServerResponse, ServerError } from 'src/types';
import { Schema } from 'src/models/schemas';
import { apiMessages } from 'src/util';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(Schema.USER) private readonly userModel: Model<User>,
  ) {}

  async findAll(): Promise<ServerResponse<User[] | ServerError>> {
    try {
      const users: User[] = await this.userModel.find();
      if (users.length) {
        return new ServerResponse(users, true);
      } else {
        return new ServerResponse(
          new ServerError(apiMessages.usersNotFound, HttpStatus.NOT_FOUND),
          false,
        );
      }
    } catch (e) {
      return new ServerResponse(
        new ServerError(e.message, HttpStatus.INTERNAL_SERVER_ERROR),
        false,
      );
    }
  }

  async delete(id: string): Promise<ServerResponse<User | ServerError>> {
    try {
      const user: User = await this.userModel.findOneAndDelete({
        _id: id,
      });
      if (user) {
        return new ServerResponse(user, true);
      } else {
        return new ServerResponse(
          new ServerError(
            `There is no user with id=${id}`,
            HttpStatus.NOT_FOUND,
          ),
          false,
        );
      }
    } catch (e) {
      return new ServerResponse(
        new ServerError(e.message, HttpStatus.NOT_FOUND),
        false,
      );
    }
  }

  async update(
    updateUserDto: UpdateUserDto,
    id: string,
  ): Promise<ServerResponse<User | ServerError>> {
    try {
      const user: User = await this.userModel.findByIdAndUpdate(
        id,
        updateUserDto,
        { new: true },
      );
      if (user) {
        return new ServerResponse(user, true);
      } else {
        return new ServerResponse(
          new ServerError(
            `There is no user with id=${id}`,
            HttpStatus.NOT_FOUND,
          ),
          false,
        );
      }
    } catch (e) {
      return new ServerResponse(
        new ServerError(e.message, HttpStatus.NOT_FOUND),
        false,
      );
    }
  }
}
