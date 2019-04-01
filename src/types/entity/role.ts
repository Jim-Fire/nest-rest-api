export interface IRole {
  id: AppRoles;
  name?: string;
}

export enum AppRoles {
  ADMIN,
  USER,
}

export class Role implements IRole {
  id: AppRoles;
  name: string;
  constructor(id = AppRoles.USER, name = 'Unnamed role') {
    this.id = id;
    this.name = name;
  }
}