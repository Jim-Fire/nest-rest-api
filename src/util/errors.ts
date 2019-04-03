
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
        text: 'User with same email is already exist',
    },
    userWrongCredentials: {
        type: Alert.ERROR,
        text: 'Wrong credentials!',
    },
    userNotFound: {
        type: Alert.WARNING,
        text: 'User with providen email not found',
    },
    userNotFoundById: {
        type: Alert.WARNING,
        text: 'There is no user with providen id',
    },
    usersNotFound: {
        type: Alert.WARNING,
        text: 'No users found',
    },
};

interface MessagesMap {
  [key: string]: {
    text: string;
    type: Alert;
  };
}
