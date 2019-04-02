export interface IRole {
  id: AppRoles;
  name?: string;
}

export enum AppRoles {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export class Role implements IRole {
  id: AppRoles;
  name: string;
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}