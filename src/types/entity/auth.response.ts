import { ServerResponse, User } from 'src/types';

export interface AuthTokenResponse {
    accessToken: string;
    user: User;
}

export class AuthResponse implements ServerResponse<AuthTokenResponse> {
  status: boolean;
  body: AuthTokenResponse;
  constructor(accessToken: string, user: User, status: boolean = true) {
    this.status = status;
    this.body = {
        accessToken,
        user,
    };
  }
}
