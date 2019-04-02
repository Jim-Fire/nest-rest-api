import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/models/user.schema';
import { TodoSchema } from 'src/models/todo.schema';
import { TodoListSchema } from 'src/models/todolist.schema';
import { Schema } from 'src/models/schemas';
import { TodoService } from './todo.service';
import { AppKeys } from 'src/config/keys';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Schema.USER, schema: UserSchema },
      { name: Schema.TODO, schema: TodoSchema },
      { name: Schema.TODO_LIST, schema: TodoListSchema },
    ]),
  ],
  providers: [TodoService],
})
export class TodoModule {}
