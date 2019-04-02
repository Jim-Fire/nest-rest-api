import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { Controller, Get, UseGuards, Post, Body, Put, HttpException, Req } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo, Request, TodoList } from 'src/types';
import { CreateUpdateTodoDto } from './dto/create-update-todo.dto';
import { CreateUpdateTodoListDto } from './dto/create-update-todolist.dto';

@Controller('todo')
@UseGuards(JwtAuthGuard)

export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  createTodo(@Body() createTodoDto: CreateUpdateTodoDto, @Req() req: Request): Promise<Todo | HttpException | void> {
    return this.todoService.createNewTodo(createTodoDto, req.user);
  }

  @Post('list')
  createTodoList(@Body() createTodoListDto: CreateUpdateTodoListDto, @Req() req: Request): Promise<TodoList | HttpException | void> {
    return this.todoService.createNewTodoList(createTodoListDto, req.user);
  }

}
