import { User } from 'src/types';

export class UpdateUserDto implements User {
  readonly email: string;
  readonly name: string;
}