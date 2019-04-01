import { IRole } from 'src/types';

export interface User {
  email: string;
  password?: string;
  name: string;
  roles?: IRole[];
}
