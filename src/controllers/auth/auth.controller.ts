import { Controller, Get, UseGuards, Post } from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('token')
  createToken() {
    return this.authService.createToken();
  }

  @Post('signup')
  registerUser(){
    return this.authService.createNewUser();
  }

  @Get('data')
  @UseGuards(new JwtAuthGuard())
  findAll() {
    // this route is restricted by AuthGuard
    // JWT strategy
    return true;
  }
}