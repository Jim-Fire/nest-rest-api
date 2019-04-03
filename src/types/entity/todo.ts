import { PartialUser } from 'src/types';

export interface Todo {
    title: string;
    description: string;
    assignee: PartialUser[];
    owner: PartialUser;
    list: TodoList;
    comments: Comment[];
}

export interface Comment {
    user: PartialUser;
    text: string;
}

export interface TodoList {
    name: string;
    color?: string;
}
