import { User } from 'src/types';

export class CreateUserDto implements User {
  readonly email: string;
  readonly password: string;
  readonly name: string;
}