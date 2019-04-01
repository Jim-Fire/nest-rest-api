import { Controller, Get, UseGuards, Post, Body, Put, HttpException } from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthUserDto } from './dto/auth-user.dto';
import { User, AppRoles } from 'src/types';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Put()
  registerUser(@Body() createUserDto: CreateUserDto): Promise<User | HttpException> {
    return this.authService.createNewUser(createUserDto);
  }

  @Post()
  authenticate(@Body() authUserDto: AuthUserDto): Promise<object | HttpException> {
    return this.authService.authenticate(authUserDto);
  }

  @Get('data')
  @Roles(AppRoles.ADMIN, AppRoles.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAll() {
    // this route is restricted by AuthGuard
    // JWT strategy
    return true;
  }
}