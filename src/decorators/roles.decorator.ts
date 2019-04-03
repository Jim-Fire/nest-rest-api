import { SetMetadata } from '@nestjs/common';
import { AppRoles } from 'src/types';

export const Roles = (...roles: AppRoles[]) => SetMetadata('roles', roles);