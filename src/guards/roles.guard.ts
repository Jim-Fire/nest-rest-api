import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IRole, AppRoles } from 'src/types';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles: AppRoles[] = this.reflector.get<AppRoles[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    // console.log('roles',roles);

    const request = context.switchToHttp().getRequest();
    const user = request.user; // get attached user
    // console.log('user', user);

    const hasRole = () =>
      user.roles.some((role: IRole) => !!roles.find(item => item === role.id));

    return user && user.roles && hasRole();
  }
}