import { User } from 'src/types';

export interface Todo {
    title: string;
    description: string;
    assignee: User[];
    owner: User;
    list: TodoList;
    comments: Comment[];
}

export interface Comment {
    user: User;
    text: string;
}

export interface TodoList {
    name: string;
    color?: string;
}
