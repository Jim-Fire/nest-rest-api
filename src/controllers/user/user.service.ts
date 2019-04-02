import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, Body, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, JwtPayload, Role, AppRoles, Todo, TodoList } from 'src/types';
import { Schema } from 'src/models/schemas';
import { apiExceptions } from 'src/util';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(Schema.USER) private readonly userModel: Model<User>,
  ) {}

  async findAll(): Promise<User[] | HttpException> {
    return await this.userModel.find();
  }

  async delete(id: string): Promise<User | HttpException> {
    try {
      const user: User = await this.userModel.findOneAndDelete({
        _id: id,
      });
      if (user) {
        return user;
      } else {
        return new HttpException(`There is no user with id=${id}`, HttpStatus.NOT_FOUND);
      }
    } catch (e) {
      return new HttpException('Some server error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(updateUserDto: UpdateUserDto, id: string): Promise<User | HttpException> {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }
}
