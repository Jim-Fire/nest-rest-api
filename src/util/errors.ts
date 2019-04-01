import { ApiException } from 'src/types';

export enum ValidationError {
    USER_NAME = ' is not a valid name!',
    USER_NAME_REQUIRED = 'User name required',
    USER_EMAIL = ' is not a valid email!',
    USER_EMAIL_REQUIRED = 'User email required',
}

export const apiExceptions: ApiExceptionKeyMap = {
    userExist: {
        error: 'AlreadyExist',
        message: 'User with same email is already exist'
    },
    userWrongPassword: {
        error: 'WrongCredentials',
        message: 'Wrong credentials for this user',
    },
    userNotFound: {
        error: 'UserNotFound',
        message: 'User with providen email not found',
    },
};

interface ApiExceptionKeyMap {
  [key: string]: ApiException;
}