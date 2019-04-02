import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { Controller, Get, UseGuards, Post, Body, Put, HttpException, Req, Delete, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User, Request, TodoList, AppRoles } from 'src/types';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from '../../guards/roles.guard';
//import { CreateUpdateTodoDto } from './dto/create-update-todo.dto';

@Controller('user')
@UseGuards(JwtAuthGuard)

export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  //@Roles(AppRoles.ADMIN)
  //@UseGuards(RolesGuard)
  getAllUsers(): Promise<User[] | HttpException> {
    return this.userService.findAll();
  }

  @Delete(':id')
  //@Roles(AppRoles.ADMIN)
  //@UseGuards(RolesGuard)
  delete(@Param('id') id: string): Promise<User | HttpException> {
    return this.userService.delete(id);
  }

}
