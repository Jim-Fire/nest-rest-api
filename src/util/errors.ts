
export enum ValidationError {
    USER_NAME = ' is not a valid name!',
    USER_NAME_REQUIRED = 'User name required',
    USER_EMAIL = ' is not a valid email!',
    USER_EMAIL_REQUIRED = 'User email required',
}

export enum Alert {
    SUCCESS = 'success',
    INFO = 'info',
    WARNING = 'warning',
    ERROR = 'error',
}

export const apiMessages: MessagesMap = {
    userExist: {
        type: Alert.WARNING,
        message: 'User with same email is already exist',
    },
    userWrongPassword: {
        type: Alert.WARNING,
        message: 'Wrong credentials for this user',
    },
    userNotFound: {
        type: Alert.WARNING,
        message: 'User with providen email not found',
    },
    usersNotFound: {
        type: Alert.WARNING,
        message: 'No users found',
    },
};

interface MessagesMap {
  [key: string]: {
    message: string;
    type: Alert;
  };
}