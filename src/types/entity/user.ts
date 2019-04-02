import { IRole } from 'src/types';

export interface User {
  _id?: string;
  email: string;
  password?: string;
  name: string;
  roles?: IRole[];
}
