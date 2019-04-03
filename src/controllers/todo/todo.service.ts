import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, Body, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, JwtPayload, Role, AppRoles, Todo, TodoList } from 'src/types';
import { Schema } from 'src/models/schemas';
import { apiMessages } from 'src/util';
import { CreateUpdateTodoDto } from './dto/create-update-todo.dto';
import { CreateUpdateTodoListDto } from './dto/create-update-todolist.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Schema.USER) private readonly userModel: Model<User>,
    @InjectModel(Schema.TODO) private readonly todoModel: Model<Todo>,
    @InjectModel(Schema.TODO_LIST) private readonly todoListModel: Model<TodoList>,
  ) {}

  async createNewTodo(createTodoDto: CreateUpdateTodoDto, user: User) {
    console.log('createNewTodo',createTodoDto,user);
  }

  async createNewTodoList(createTodoListDto: CreateUpdateTodoListDto, user: User) {
    console.log('createTodoListDto',createTodoListDto,user);
  }
}
